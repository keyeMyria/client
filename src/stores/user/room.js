import { observable, action, computed } from 'mobx';
import { wsAPI } from 'utils/wsapi';

export class UserRoomStore {
  @observable role;
  @observable banned;
  @observable follower;

  constructor() {
    this.reset();

    wsAPI.on('roomUserBanned', () => {
      this.banned = true;
    });

    wsAPI.on('roomUserRoleChanged', roleName => {
      this.role = roleName;
    });
  }

  reset() {
    this.role = 'guest';
    this.banned = false;
    this.follower = false;
  }
}

export const userRoomStore = new UserRoomStore();