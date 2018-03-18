import React from 'react';
import isMobile from 'ismobilejs';
import { reaction } from 'mobx';
import { roomPlayerStore, roomModeWaitlistStore } from 'stores';

export class RoomPlayerSoundcloud extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.warmup = false;
    this.player = null;
		this.trackId = null;
		this.disposers = [];
  }  

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.createPlayer();

    this.disposers = [
			// Volume
			reaction(() => roomPlayerStore.volume, volume => {
				this.setVolume(volume);
			}),
			// Play/Pause
			reaction(() => roomPlayerStore.paused, paused => {
				if (
          roomModeWaitlistStore.playData.source &&
          roomModeWaitlistStore.playData.source.service === 'soundcloud'
        ) {
					paused ? this.pause() : this.play();
				}
			}),
			// Mute
			reaction(() => roomPlayerStore.mute, mute => {
				this.mute(mute);
			}),
			reaction(() => roomModeWaitlistStore.playData.clientStart, clientStart => {
				if (
          clientStart > 0 &&
          roomModeWaitlistStore.playData.source &&
					roomModeWaitlistStore.playData.source.service === 'soundcloud'
				) {
					const trackId = roomModeWaitlistStore.playData.source.serviceId;
	
					if (this.player) {
            this.setSource(trackId);
					} else {
						this.trackId = trackId;
					}
				} else {
					this.pause();
				}
			})
		];
  }
  
  componentWillUnmount() {
    this.disposers.forEach(disposer => disposer());
		roomPlayerStore.stop();
    this.pause();
  }

  play(start = roomModeWaitlistStore.playData.clientStart) {
    const seek = start ? Math.floor(Date.now() / 1000) - start : 0;
    if (this.player) {
      this.player.currentTime = seek;
      this.player.load();
      this.player.play();
    }
  }

  pause() {
    this.player && this.player.pause();
  }

  mute(muted) {
    this.player && (this.player.muted = muted);
  }

  setVolume(volumeValue) {
    this.player && (this.player.volume = volumeValue / 100);
  }

  setSource(trackId) {
    this.warmup = true;
    const sourceUrl = roomPlayerStore.makeSoundCloudURL(trackId);
    this.player.src = sourceUrl;

    setTimeout(() => {
      if (!isMobile.any) {
        this.play();
        roomPlayerStore.play();
      }
    }, 100);
  }

  createPlayer() {
    const { volume, mute } = roomPlayerStore;
    
    this.player = new Audio();
    
    setTimeout(() => {
      if (!this.warmup) {
        this.src = 'https://ravepro.ams3.digitaloceanspaces.com/warmup.mp3';
        this.player.load();
        this.play(0);
        this.warmup = true;
      }
    }, 200);

    if (this.trackId) {
      this.setSource(this.trackId);
      this.trackId = null;
    }
    
    this.setVolume(volume);
    this.mute(mute);
  }

  render() {    
    return null;
  }
}