import React, { useState, useEffect } from 'react';
import { GoogleContext } from './contexts/GoogleContext';
import * as dateFns from 'date-fns';
import * as aizattoDateFns from '@aizatto/date-fns';
import styles from './styles/styles.module.scss';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const day = new Date();
// const defaultTimeMin = dateFns.startOfDay(day);
// const defaultTimeMax = dateFns.endOfDay(dateFns.addDays(day, 5));

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

  const declined = attendees.filter(attendee => attendee.responseStatus === "declined");

  const attendeesElement = attendees.map(attendee =>  {
    const style = attendee.responseStatus === "declined"
      ? {textDecoration: "line-through"}  
      : {};

    const name = attendee.displayName ? attendee.displayName : attendee.email;

    return (
      <li
        key={`${event.id}:${attendee.email}`}
        style={style}
        title={`${name}: ${attendee.responseStatus}`}>
        {name}
      </li>
    );
  });

  return (
    <>
      Attendees: {attendees.length - declined.length}/{attendees.length}
      <ol>
        {attendeesElement}
      </ol>
    </>
  );
}

const DateTime: React.FC<{event: gapi.client.calendar.Event}> = (props) => {
  const event = props.event;
  if (!event.start.dateTime ||
      !event.end.dateTime) {
    return <></>
  }

  const startDateTime =  new Date(event.start.dateTime);
  const endDateTime = new Date(event.end.dateTime);

  return (
    <span title={`${event.start.dateTime} - ${event.end.dateTime}`}>
      {dateFns.format(startDateTime, 'HH:mm')}
      {' - '}
      {dateFns.format(endDateTime, 'HH:mm')}
    </span>
  );
}

const Intervals: React.FC<{intervals: {start: Date, end: Date}[]}> = (props) => {
  const elements = props.intervals.map(interval => {
    const seconds = (interval.end.getTime() - interval.start.getTime()) / 1000;

    const isPast = dateFns.isPast(interval.end);

    const style = isPast
      ? {textDecoration: "line-through"}  
      : {};

    const className = isPast
      ? 'text-muted'
      : undefined;

    return (
      <li key={interval.start.toISOString()} className={className} style={style}>
        {dateFns.format(interval.start, 'HH:mm')} - {dateFns.format(interval.end, 'HH:mm')}
        {': '}
        {IntervalTime(seconds)}
      </li>
    )
  });

  return (
    <ol>
      {elements}
    </ol>
  )
}

const IntervalBlock: React.FC<{intervals: { start: Date, end: Date }[]}> = (props) => {
  const intervals = props.intervals;
  const remainingIntervals = intervals.filter(interval => dateFns.isFuture(interval.end));
  const remaining = aizattoDateFns.intervalsTotal(remainingIntervals);

  let remainingElement: any = IntervalTime(remaining / 1000);

  if (remainingIntervals.length !== intervals.length){
    remainingElement = <span className="text-muted">{remainingElement}</span>;
  }

  const time = remainingElement.length !== 0
    ?
      <>
        {remainingElement}
        {' / '}
        {IntervalTime(aizattoDateFns.intervalsTotal(intervals) / 1000)}
      </>
    : null;

  return (
    <>
    {' '}
    {time}
    <Intervals intervals={intervals} />
    </>
  );
}

const IntervalTime = (seconds: number) => {
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor(seconds / 60) % 60;

  let time = [];

  if (hours > 1) {
    time.push(`${hours} hours`)
  } else if (hours === 1) {
    time.push(`${hours} hour`)
  }

  if (minutes > 1) {
    time.push(`${minutes} minutes`)
  } else if (minutes === 1) {
    time.push(`${minutes} minute`)
  }

  return time.join(' ');
}

const Event: React.FC<{event: gapi.client.calendar.Event}> = (props) => {
  const event = props.event;
  const [collapsed, setCollapsed] = useState(() => {
    if (event.status === "cancelled") {
      return true;
    }

    // @ts-ignore
    if (dateFns.isPast(new Date(event.end.dateTime))) {
      return true;
    }

    return event.attendees?.findIndex(attendee => attendee.self && attendee.responseStatus === "declined") !== -1;
  });


  const summary = 
    <>
      <DateTime event={event} />
      {' '}
      <a href={event.htmlLink}>{event.summary}</a>
    </>;

  if (collapsed) {
    return (
      <>
        <span style={{textDecoration: "line-through"}}>
          {summary}
        </span>
        {' '}
        &middot;
        {' '}
        <span className="text-muted" style={{cursor: 'pointer'}} onClick={() => setCollapsed(false)}>
          Show Details
        </span>
      </>
    )
  }

  const hangoutButton = event.hangoutLink
    ? <a href={event.hangoutLink}>Hangout Link</a>
    : <span style={{textDecoration: 'line-through'}}>Hangout Link</span>

  const locationElement = event.location
    ? <div>{event.location}</div>
    : null;

  return (
    <>
      <div>
        {summary}
      </div>
      {locationElement}

      <Attendees event={event} />

      <div className={styles.description} dangerouslySetInnerHTML={{__html: event.description}} />

      {hangoutButton}
    </>
  );
}

// const CalendarList: React.FC<{calendars: gapi.client.calendar.CalendarListEntry[]}> = (props) => {
//   const elements = props.calendars.map((calendar) => {
//     return (
//       <li key={calendar.id}>
//       </li>
//     )
//   })

//   return (
//     <>
//       <ol>
//         {elements}
//       </ol>
//     </>
//   );
// }

export const CalendarAuthenticated: React.FC = (props) => {
  const [timeMin, setTimeMin] = useState(() => dateFns.startOfDay(day));
  const [timeMax, setTimeMax] = useState(() => dateFns.endOfDay(dateFns.addDays(day, 5)));

  // const [calendars, setCalendars] = useState<gapi.client.calendar.CalendarListEntry[]>([]);
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

      // const calendars = await gapi.client.calendar.calendarList.list();
      // setCalendars(calendars.result.items);
    })();
  }, [timeMin, timeMax]);

  const eventsFiltered = events.filter(
    (event) => {
      // if (event.status === 'cancelled') {
      //   return false;
      // }
      if (event.end.date) {
        const endDateTime = dateFns.endOfDay(new Date(event.end.date));
        return dateFns.isAfter(endDateTime, timeMin);
      }
      
      if (event.end.dateTime &&
          dateFns.isBefore(new Date(event.end.dateTime), timeMin)) {
        return false;
      }

      return true;
    }
  );

  /**
   * lodash.groupBy doesn't work for multi day events
   */
  const eventsGroupBy = new Map<string, gapi.client.calendar.Event[]>();
  // const eventsGroupBy = lodash.groupBy(
  eventsFiltered.forEach(
    (event) => {
      const start = event.start.date ?? event.start.dateTime;
      const end = event.end.date ?? event.end.dateTime;

      if (!start || !end) {
        return;
      }

      const startDate = new Date(start);
      const endDate = new Date(end);
      const dates = dateFns.eachDayOfInterval({
        start: startDate,
        end: endDate,
      });

      dates.forEach(date => {
        const key = date.toISOString();
        const events = eventsGroupBy.get(key) ?? [];
        events.push(event);
        if (!eventsGroupBy.has(key)) {
          eventsGroupBy.set(key, events);
        }
      })
    });
  
  const days = Array.from(eventsGroupBy).map(([dateStr, events]) => {
    const date = new Date(dateStr);
    const intervals = events.filter(event => {
      if (event.status === 'cancelled') {
        return false;
      }

      if (!event.start.dateTime || !event.end.dateTime) {
        return false;
      }

      return event.attendees?.findIndex(attendee => attendee.self && attendee.responseStatus === "declined") === -1;
    }).map(event => {
      return {
        // @ts-ignore
        start: new Date(event.start.dateTime),
        // @ts-ignore
        end: new Date(event.end.dateTime),
      }
    });

    const busyIntervals = aizattoDateFns.mergeIntervals(intervals);
    const freeIntervals = aizattoDateFns.oppositeIntervals(
      {
        start: dateFns.startOfDay(date),
        end: dateFns.endOfDay(date),
      },
      busyIntervals,
    );

    const eventsElements = events.map(event => {
      return (
        <li key={event.id} style={{paddingBottom: '1rem'}}>
          <Event event={event} />
        </li>
      );
    });

    return (
      <React.Fragment key={dateStr}>
        <h5>{dateFns.format(date, 'EEEE yyyy-MM-dd')}</h5>

        Busy: 
        <IntervalBlock intervals={busyIntervals} />

        Free: 
        <IntervalBlock intervals={freeIntervals} />

        Schedule: {eventsElements.length} {eventsElements.length > 1 ? 'events' : 'event'}
        <ol>
          {eventsElements}
        </ol>
      </React.Fragment>
    );
  });

  return (
    <>
      <a href="https://calendar.google.com/">Google Calendar</a>
      <div>
        <RangePicker
          defaultValue={[moment(timeMin), moment(timeMax)]}
          onChange={(dates) => {
            setTimeMin(dates[0]!.toDate());
            setTimeMax(dates[1]!.toDate());
          }}
        />
      </div>
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