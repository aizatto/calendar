import React from 'react';
import copy from 'copy-to-clipboard';
import { Icon } from 'antd';

interface ConferenceData {
  entryPoints: {
    entryPointType: string,
    uri: string,
    label: string,
    meetingCode: string,
    password: string,
  }[]
}

export function conference(event: gapi.client.calendar.Event) {
  if (event.hangoutLink) {
    return event.hangoutLink;
  }

  // @ts-ignore
  const conferenceData: ConferenceData = event.conferenceData;
  if (!conferenceData) {
    return;
  }

  const entry = conferenceData.entryPoints.find(entry => entry.entryPointType === 'video');
  return entry?.uri;
}

export const ConferenceComponent: React.FC<{event: gapi.client.calendar.Event}> = (props) => {
  const url = conference(props.event);

  return url
    ? <span>
        Video Call:
        {' '}
        <a href={url}>
          {url}
        </a>
        {' '}
        <span onClick={() => url && copy(url)} style={{cursor: "pointer"}}>
          <Icon type="copy"/>
        </span>
      </span>
    : <span style={{textDecoration: 'line-through'}}>Video Call</span>
}