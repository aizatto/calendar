import React from 'react';

export const GoogleContext = React.createContext({
  authenticated: false,
  // IsSignedInListener: (signedIn: boolean): void => {},
});