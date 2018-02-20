import React from 'react';
import isMobile from 'ismobilejs';

export class PlayerHtml5Audio extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
  }  
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const { mute, volume, paused, sourceUrl, start } = nextProps;
    
    if (this.props.volume != volume) {
      this.setVolume(volume);
    }
    
    if (this.props.mute != mute) {
      this.mute(mute);
    }
    
    if (
      (this.props.paused != paused) ||
      (this.props.start != start)
    ) {
      paused ? this.pause() : this.play(start);
    }

    if (this.props.sourceUrl != sourceUrl) {
      this.pause();
      
      this.player.src = sourceUrl;
      this.player.currentTime = start;

      this.play(start);
    }
  }

  componentDidMount() {
    this.createPlayer();  
  }
  
  componentWillUnmount() {
    this.pause();
    this.props.onStop();
  }

  play(start) {
    const seek = start ? Math.floor(Date.now() / 1000) - start : 0;
    if (this.player) {
      this.player.currentTime = seek;
      this.player.play()
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

  createPlayer() {
    const { mute, volume, sourceUrl, start } = this.props;
    
    if (!sourceUrl) return;
    
    this.player = new Audio();
    this.player.src = sourceUrl;
    this.player.currentTime = start;
    
    this.setVolume(volume);
    this.mute(mute);
    
    if (!isMobile.any) {
      this.play(start);
      this.props.onPlay();
    }
  }

  render() {    
    return null;
  }
}