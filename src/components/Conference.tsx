import React from 'react';
import copy from 'copy-to-clipboard';
import { Button } from 'antd';

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

  if (!url) {
    return <span style={{textDecoration: 'line-through'}}>Video Call</span>;
  }

  const { event } = props;

  const message = [
    `@here ${event.summary}`,
    url,
    event.description,
  ].join("\n\n");

  return (
    <span>
      Video Call:
      {' '}
      <a href={url}>
        {url}
      </a>

      <Button.Group>
        <Button icon="video-camera" href={url}>
          Video Call
        </Button>
        <Button icon="copy" href={url} onClick={() => copy(url)}>
          Copy URL
        </Button>
        <Button icon="copy" onClick={() => copy(message)}>
          Copy as Message
        </Button>
      </Button.Group>
    </span>
  )
}