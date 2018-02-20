import { observable, action, computed } from 'mobx';
import { wsAPI } from 'utils/wsapi';
import { reorder, getClientStartTime } from 'utils';

export class RoomModeWaitlistStore {
  @observable userPlaylist;
  @observable users;
  @observable playData;

  setPlayData(playData) {
    this.playData = {
      source: null,
      user: null,
      start: 0,
      serverTime: 0,
      clientStart: 0
    };
    
    if (playData) {
      this.playData = {
        ...playData,
        clientStart: getClientStartTime(playData.serverTime, playData.start)
      }; 
    }
  }

  constructor() {
    this.reset();

    wsAPI.on('waitlistAddSource', this.addSource);
    wsAPI.on('waitlistMoveSource', ({ lastPos, newPos }) => {
      this.moveSource(lastPos, newPos); 
    });
    wsAPI.on('waitlistRemoveSource', this.removeSource);

    wsAPI.on('waitlistAddUser', this.addUser);
    wsAPI.on('waitlistMoveUser', ({ lastPos, newPos }) => {
      this.moveSource(lastPos, newPos); 
    });
    wsAPI.on('waitlistRemoveUser', this.removeUser);

    wsAPI.on('waitlistPlayData', (playData) => {
      this.setPlayData(playData);
    });
  }

  reset() {
    this.userPlaylist = [];
    this.users = [];

    this.playData = {
      source: null,
      user: null,
      start: 0,
      serverTime: 0,
      clientStart: 0
    };
  }

  addSource = (source) => {
    this.userPlaylist.push(source);
  }

  moveSource = (lastPos, newPos) => {
    this.userPlaylist = reorder(this.userPlaylist, lastPos, newPos);
  }

  removeSource = (id) => {
    this.userPlaylist = this.userPlaylist.filter(user => user.id != id);
  }

  addUser = (user) => {
    this.users.push(user);
  }

  moveUser = (lastPos, newPos) => {
    this.users = reorder(this.users, lastPos, newPos);
  }

  removeUser = (id) => {
    this.users = this.users.filter(user => user.id != id);
  }
}

export const roomModeWaitlistStore = new RoomModeWaitlistStore();