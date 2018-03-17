import React from 'react';
import { reaction } from 'mobx';
import { roomModeWaitlistStore } from 'stores';
import { PlayerVideo, PlayerAudio, PlayerNone } from 'components/player';
import { RoomPlayerYoutube } from 'components/room/player/youtube';
import { RoomPlayerSoundcloud } from 'components/room/player/soundcloud';

export class WaitlistPlayer extends React.Component {
  
  componentDidMount() {
    reaction(() => roomModeWaitlistStore.playData.source, source => {
      const service = source ? source.service : null;
      this.setService(service);
    });
  }

  setService = (service) => {
    switch (service) {
      case 'youtube':
        return this.setYoutube();
      case 'soundcloud':
        return this.setSoundcloud();
      default:
        return this.setNone();
    }
  }

  getElm = (cls) => {
    return document.getElementsByClassName(cls)[0];
  }

  hide = (cls) => {
    this.getElm(cls).style.display = 'none';
  }

  show = (cls) => {
    this.getElm(cls).style.display = 'block';
  }

  setYoutube = () => {
    this.hide('roomNonePlayer');
    this.hide('roomSoundcloudPlayer');
    this.show('roomYoutubePlayer');
  }

  setSoundcloud = () => {
    this.hide('roomNonePlayer');
    this.show('roomSoundcloudPlayer');
    this.hide('roomYoutubePlayer');
  }

  setNone = () => {
    this.show('roomNonePlayer');
    this.hide('roomSoundcloudPlayer');
    this.hide('roomYoutubePlayer');
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="roomNonePlayer" style={{ display: 'block' }}>
          <PlayerNone />
        </div>
        <div className="roomYoutubePlayer" style={{ display: 'none' }}>
          <PlayerVideo>
            <RoomPlayerYoutube />
          </PlayerVideo>
        </div>
        <div className="roomSoundcloudPlayer" style={{ display: 'none' }}>
          <PlayerAudio>
            <RoomPlayerSoundcloud />
          </PlayerAudio>
        </div>
      </React.Fragment>
    );
  }
}