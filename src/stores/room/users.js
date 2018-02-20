import { observable, action, computed } from 'mobx';

export class RoomUsersStore {
  @observable users;

  constructor() {
    this.reset();
  }

  reset() {
    this.users = [];
  }  
}

export const roomUsersStore = new RoomUsersStore();