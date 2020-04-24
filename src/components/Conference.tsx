import React from 'react';
import copy from 'copy-to-clipboard';
import { Button } from 'antd';
import htmlToText from 'html-to-text';

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
    htmlToText.fromString(event.description),
  ].join("\n\n");

  return (
    <span>
      <Button.Group>
        <Button icon="video-camera" href={url}>
          Video Call
        </Button>
        <Button icon="copy" onClick={() => copy(url)}>
          Copy URL
        </Button>
        <Button icon="copy" onClick={() => copy(message)}>
          Copy as Slack Message
        </Button>
      </Button.Group>
      <div>
        Video Call:
        {' '}
        <a href={url}>
          {url}
        </a>
      </div>
    </span>
  )
}