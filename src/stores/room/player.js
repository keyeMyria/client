import { observable, action, computed } from 'mobx';

export class RoomPlayerStore {
  @observable volume;
  @observable paused;
  @observable mute;
  @observable scKey = "d03bc67acf78cf6f304edecde8cfc48c";

  constructor() {
    this.reset();
  }

  reset = () => {
    this.volume = localStorage.volume ? parseInt(localStorage.volume) : 50;
    this.paused = true;
    this.mute = !!parseInt(localStorage.mute);
  }

  makeSoundCloudURL = trackId => {
    const apiUrl = 'https://api.soundcloud.com/tracks';
    const clientId = this.scKey;
    return `${apiUrl}/${trackId}/stream?client_id=${clientId}`;
  }

  setVolume = (value) => {
    localStorage.volume = value;
    this.volume = value;
  }

  play = () => {
    this.paused = false;
  }

  stop = () => {
    this.paused = true;
  }

  triggerPlay = () => {
    this.paused = !this.paused;
  }

  triggerMute = () => {
    localStorage.mute = !this.mute ? 1 : 0;
    this.mute = !this.mute;
  }
}

export const roomPlayerStore = new RoomPlayerStore();