import { observable, action, computed } from 'mobx';
import { wsAPI } from 'utils/wsapi';
import { reorder, getClientStartTime } from 'utils';
import { roomStore } from 'stores';

export class FollowRoomsStore {
  @observable rooms;

  constructor() {
    this.reset();
  }

  reset() {
    this.rooms = [];
  }

}

export const followRoomsStore = new FollowRoomsStore();