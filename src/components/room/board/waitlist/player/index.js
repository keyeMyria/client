import React from 'react';

import { PlayerYoutubeVideo } from 'components/player/youtubeVideo';
import { PlayerSoundCloud } from 'components/player/soundcloud';
import { PlayerNone } from 'components/player';

export const WaitlistPlayer = ({ playing }) => {
  const service = playing.source ? playing.source.service : null;
  switch (service) {
    case 'youtube':
      return <PlayerYoutubeVideo playing={playing} />
    case 'soundcloud':
      return <PlayerSoundCloud playing={playing} />
    default:
      return <PlayerNone />
  }
}