import { observable, action, computed } from 'mobx';

export class RoomProfileStore {
  @observable open;
  @observable user;

  constructor() {
    this.reset();
  }

  reset() {
    this.open = false;
    this.user = null;
  }  

  setAndOpen = (user) => {
    this.user = user;
    this.open = true;
  }

  close() {
    this.reset();
  }
}

export const roomProfileStore = new RoomProfileStore();