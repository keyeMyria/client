import { observable, action, computed } from 'mobx';

export class RoomBansStore {
  @observable users;

  constructor() {
    this.reset();
  }

  reset() {
    this.users = [];
  }

  removeUser = (userId) => {
    this.users = this.users.filter(user => user.user.id != userId);
  }
}

export const roomBansStore = new RoomBansStore();