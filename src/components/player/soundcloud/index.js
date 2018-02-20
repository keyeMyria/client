import React from 'react';
import { inject, observer } from 'mobx-react';
import { PlayerControl } from '../control';
import { PlayerHtml5Audio } from '../html5Audio';
import { PlayerAudio } from '../';

const getSourceUrl = trackId => {
  const apiUrl = 'https://api.soundcloud.com/tracks';
  const clientId = process.env.SC_CLIENT_ID;
  return `${apiUrl}/${trackId}/stream?client_id=${clientId}`;
}

@inject('roomPlayerStore', 'roomStore')
@observer
export class PlayerSoundCloud extends React.Component {
  render() {
    const { roomPlayerStore, roomStore, playing } = this.props;
    const { source } = playing;
    const sourceUrl = getSourceUrl(source.serviceId);

    return (
      <PlayerAudio
        cover={source.cover || roomStore.roomAvatar}
        start={playing.clientStart}
        duration={source.duration}>
        <PlayerHtml5Audio
          volume={roomPlayerStore.volume}
          paused={roomPlayerStore.paused}
          mute={roomPlayerStore.mute}
          onStop={roomPlayerStore.stop}
          onPlay={roomPlayerStore.play}
          sourceUrl={sourceUrl}
          start={playing.clientStart} />
      </PlayerAudio>
    );
  }
}