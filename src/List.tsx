import React, { useState, useEffect } from 'react';
import { GoogleContext } from './contexts/GoogleContext';
import * as dateFns from 'date-fns';
import lodash from 'lodash';

const day = new Date();
const timeMin = dateFns.startOfDay(day);
const timeMax = dateFns.endOfDay(dateFns.addDays(day, 5));

const Attendees: React.FC<{event: gapi.client.calendar.Event}> = (props) => {
  const event = props.event;

  if (!event.attendees || !event.attendees.length) {
    return <></>;
  }

  const attendees = event.attendees.sort((a, b) => {
    if (a.displayName && !b.displayName) {
      return 1;
    } else if (!a.displayName && b.displayName) {
      return -1;
    }

    return a.email.localeCompare(b.email);
  });

  const attendeesElement = attendees.map(attendee => 
    <li key={`${event.id}:${attendee.email}`}>
      {attendee.displayName ? attendee.displayName : attendee.email}
    </li>
  );

  return (
    <>
      Attendees:
      <ol>
        {attendeesElement}
      </ol>
    </>
  );
}

const Event: React.FC<{event: gapi.client.calendar.Event}> = (props) => {
  const event = props.event;

  const start = event.start.dateTime
    ? <span title={event.start.dateTime}>
        {dateFns.format(new Date(event.start.dateTime), 'HH:mm')}
      </span>
    : null;

  const hangoutButton = event.hangoutLink
    ? <a href={event.hangoutLink}>Hangout Link</a>
    : <span style={{textDecoration: 'line-through'}}>Hangout Link</span>

  const locationElement = event.location
    ? <div>{event.location}</div>
    : null;

  return (
    <>
      <div>
        {start} <a href={event.htmlLink}>{event.summary}</a>
      </div>
      {locationElement}

      <Attendees event={event} />

      <div dangerouslySetInnerHTML={{__html: event.description}} />

      {hangoutButton}
    </>
  );
}

export const CalendarAuthenticated: React.FC = (props) => {
  const [events, setEvents] = useState<gapi.client.calendar.Event[]>([]);
  useEffect(() => {
    (async () => {
      const events = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        maxResults: 100, 
        orderBy: 'startTime',
        singleEvents: true,
      });
      setEvents(events.result.items);
    })();
  }, []);

  const eventsFiltered = events.filter(
    (event) => {
      if (event.status === 'cancelled') {
        return false;
      }
      
      if (event.end.dateTime &&
          dateFns.isBefore(new Date(event.end.dateTime), timeMin)) {
        return false;
      }

      return true;
    }
  );

  const eventsGroupBy = lodash.groupBy(
    eventsFiltered,
    (event) => {
      if (!event.start.dateTime) {
        return null;
      }
      return dateFns.startOfDay(new Date(event.start.dateTime))
    });
  
  const days = lodash.map(eventsGroupBy, (events, date) => {
    const eventsElements = events.map(event => {
      return (
        <li key={event.id} style={{paddingBottom: '1rem'}}>
          <Event event={event} />
        </li>
      );
    });

    return (
      <React.Fragment key={date}>
        <h5>{dateFns.format(new Date(date), 'EEEE yyyy-MM-dd')}</h5>
        <ol>
          {eventsElements}
        </ol>
      </React.Fragment>
    );
  });

  return (
    <>
      {days}
    </>
  )
}

export const Calendar: React.FC = (props) => {
  return (
    <>
      <GoogleContext.Consumer>
        {({authenticated}) => (
          authenticated 
            ? <CalendarAuthenticated />
            : <>Not Authenticated</>
        )}
      </GoogleContext.Consumer>
    </>
  )
}