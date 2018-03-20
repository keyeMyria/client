import { observable, action, computed } from 'mobx';
import { wsAPI } from 'utils/wsapi';

export class RoomStore {
  @observable status;
  @observable tab;
  @observable id;
  @observable name;
  @observable title;
  @observable avatar;
  @observable followerMode;
  @observable slowMode;
  @observable mode;
  @observable collectionCount;
  @observable connectionsCount;
  @observable usersCount;
  @observable guestsCount;
  @observable followersCount;

  constructor() {
    this.reset();

    wsAPI.on('connectionsCountChanged', (counts) => {
      this.connectionsCount = counts.connectionsCount;
      this.usersCount = counts.usersCount;
      this.guestsCount = counts.guestsCount;
    });

    wsAPI.on('followerModeChanged', (isActive) => {
      this.followerMode = isActive;
    });

    wsAPI.on('slowModeChanged', (isActive) => {
      this.slowMode = isActive;
    });

    wsAPI.on('roomTitleChanged', (title) => {
      this.title = title;
    });

    wsAPI.on('roomUserBanned', () => {
      this.status = 'userbanned';
    });
  }

  reset() {
    this.status = 'loading';
    this.tab = '';
    this.id = null;
    this.name = null;
    this.title = null;
    this.avatar = null;
    this.followerMode = false;
    this.slowMode = false;
    this.mode = null;
    this.collectionCount = 0;
    this.connectionsCount = 0;
    this.usersCount = 0;
    this.guestsCount = 0;
    this.followersCount = 0;
  }  
}

export const roomStore = new RoomStore();