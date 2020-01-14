import React, { useState, useEffect } from 'react';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import { GoogleContext } from './contexts/GoogleContext';
import { Button, Container } from 'reactstrap';
import { Calendar } from './List';

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;

    const initClient = async () => {
      const discoveryDocs = [
        // https://developers.google.com/calendar/quickstart/js
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
      ];
      const scope = [
        'https://www.googleapis.com/auth/calendar.events.readonly',
        'https://www.googleapis.com/auth/calendar.readonly',
      ].join(' ');
      await gapi.client.init({
        discoveryDocs,
        scope,
        apiKey: process.env.REACT_APP_GOOGLE_APP_ID,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      });

      const GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen((signedIn) => {
        setAuthenticated(signedIn);
      });
      const googleUser = GoogleAuth.currentUser.get();
      setAuthenticated(googleUser.isSignedIn());
      // console.log(googleUser.getBasicProfile());
    }
    script.onload = () => {
      gapi.load('client:auth2', initClient);
    }

    const firstScript = document.getElementsByTagName('script')[0];
    // @ts-ignore
    firstScript.parentNode.insertBefore(script, firstScript);
  }, []);

  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn({
      prompt: 'select_account',
    });
  }

  const signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  }

  return (
    <GoogleContext.Provider value={{authenticated}}>
      <div className="App">
        {!authenticated
          ? <Button onClick={signIn}>
              Sign In
            </Button>
          : <Button onClick={signOut}>
              Sign out
            </Button>
        }
      </div>
      <Container>
        <Calendar />
      </Container>
    </GoogleContext.Provider>
  );
}

export default App;
