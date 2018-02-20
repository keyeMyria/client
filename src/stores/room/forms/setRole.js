import { observable } from 'mobx';

export class RoomSetRoleFormStore {
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

export const roomSetRoleFormStore = new RoomSetRoleFormStore();