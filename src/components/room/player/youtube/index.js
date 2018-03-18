import React from 'react';
import { reaction } from 'mobx';
import isMobile from 'ismobilejs';
import YoutubePlayer from 'react-youtube';
import { roomPlayerStore, roomModeWaitlistStore } from 'stores';

export class RoomPlayerYoutube extends React.Component {
	constructor(props) {
		super(props);

		this.warmup = false;
    this.player = null;
		this.videoId = null;
		this.disposers = [];
  }
  
  componentDidMount() {
		this.disposers = [
			// Volume
			reaction(() => roomPlayerStore.volume, volume => {
				this.setVolume(volume);
			}),
			// Play/Pause
			reaction(() => roomPlayerStore.paused, paused => {
				if (
					roomModeWaitlistStore.playData.source &&
					roomModeWaitlistStore.playData.source.service === 'youtube'
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
					roomModeWaitlistStore.playData.source.service === 'youtube'
				) {
					const videoId = roomModeWaitlistStore.playData.source.serviceId;
	
					if (this.player) {
						this.warmup = true;
						this.player.loadVideoById(videoId);
					} else {
						this.videoId = videoId;
					}
				} else {
					this.pause();
				}
			})
		];
  }

	shouldComponentUpdate() {
		return false;
	}

	componentWillUnmount() {
		this.disposers.forEach(disposer => disposer());
		roomPlayerStore.stop();
	}

	play(start = roomModeWaitlistStore.playData.clientStart) {
		const { player } = this;
		const seek = start ? Math.floor(Date.now() / 1000) - start : 0;

		if (player) {
			player.seekTo(seek);
			player.playVideo();
		}
	}

	pause() {
		this.player && this.player.pauseVideo();
	}

	stop() {
		this.player && this.player.stopVideo();
	}

	mute(muted) {
		if (this.player) {
			muted ? this.player.mute() : this.player.unMute();
		}
	}

	setVolume(volume) {
		this.player && this.player.setVolume(volume);
	}

	onStateChange = (e) => {
		if (e.data === -1) {
			this.play();
		}
	}

	onYoutubeReady = (e) => {
		const { volume, mute } = roomPlayerStore;
		this.player = e.target;
		
		if (!this.warmup) {
			this.player.loadVideoById('g8K21P8CoeI');
			this.warmup = true;
		}
		
    this.setVolume(volume);
    this.mute(mute);

    if (this.videoId) {
			this.warmup = true;
      this.player.loadVideoById(this.videoId);
      this.videoId = null;
    }
    
    if (!isMobile.any) {
      this.play();
    }
	}

	onPauseYoutube = () => {
		if (this.warmup) {
			roomPlayerStore.stop();
		}
	}

	onPlayYoutube = () => {
		if (this.warmup) {
			roomPlayerStore.play();
		}
	}

	render() {
		const opts = {
			playerVars: {
				controls: 0, // Скрыть элементы управления
				modestbranding: 1, // Скрыть лого ютуба
				rel: 0, // Запретить показ рекомендованных видео
				showinfo: 0, // Скрыть инфо о видео
				iv_load_policy: 3, // Скрыть аннотации
				disablekb: 1, // Отключить управление кнопками
				autoplay: 0
			}
		};

		return (
			<YoutubePlayer
				onReady={this.onYoutubeReady}
				onPlay={this.onPlayYoutube}
				onPause={this.onPauseYoutube}
				onStateChange={this.onStateChange}
				opts={opts}
			/>
		);
	}
}