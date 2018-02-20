import React from 'react';
import { inject, observer } from 'mobx-react';
import { PlayerYoutube } from '../youtube';
import { PlayerVideo } from '../';

@inject('roomPlayerStore')
@observer
export class PlayerYoutubeVideo extends React.Component {
  render() {
    const { roomPlayerStore, playing } = this.props;
    const { duration, serviceId } = playing.source;

    return (
      <PlayerVideo start={playing.clientStart} duration={duration}>
        <PlayerYoutube
          volume={roomPlayerStore.volume}
          paused={roomPlayerStore.paused}
          mute={roomPlayerStore.mute}
          onStop={roomPlayerStore.stop}
          onPlay={roomPlayerStore.play}
          videoId={serviceId}
          start={playing.clientStart} />
      </PlayerVideo>
    );
  }
}