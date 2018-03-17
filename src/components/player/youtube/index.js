import React from 'react';
import isMobile from 'ismobilejs';
import YoutubePlayer from 'react-youtube';

export class PlayerYoutube extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			player: null
		};
	}

	shouldComponentUpdate() {
		return false;
	}

	componentWillReceiveProps(nextProps) {
		const { volume, mute, paused, start, videoId } = nextProps;

		if (this.props.volume != volume) {
			this.setVolume(volume);
		}

		if (this.props.mute != mute) {
			this.mute(mute);
		}

		if (this.props.paused != paused || this.props.start != start) {
			paused ? this.pause() : this.play(start);
		}

		if (this.props.videoId != videoId) {
			this.loadVideoById(videoId);
		}
	}

	componentWillUnmount() {
		this.props.onStop();
	}

	play(start = 0) {
		const { player } = this.state;
		const seek = start ? Math.floor(Date.now() / 1000) - start : 0;

		if (player) {
			player.seekTo(seek);
			player.playVideo();
		}
	}

	pause() {
		this.state.player && this.state.player.pauseVideo();
	}

	mute(muted) {
		if (this.state.player) {
			muted ? this.state.player.mute() : this.state.player.unMute();
		}
	}

	setVolume(volume) {
		this.state.player && this.state.player.setVolume(volume);
	}

	onStateChange = (e) => {
		if (e.data === -1) {
			this.play();
		}
	}

	onYoutubeReady = (e) => {
		const { roomPlayerStore, start, volume, mute } = this.props;
		const player = e.target;

		this.setState({ player }, () => {
			this.setVolume(volume);
			this.mute(mute);
			if (!isMobile.any) {
				this.play(start);
			}
		});
	}

	onPauseYoutube = () => {
		this.props.onStop();
	}

	onPlayYoutube = () => {
		this.props.onPlay();
	}

	render() {
		console.log('yt render');
		const { videoId } = this.props;

		if (!videoId) {
			return null;
		}

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
				videoId={videoId}
			/>
		);
	}
}