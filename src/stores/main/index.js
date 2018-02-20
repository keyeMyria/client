import { observable, action, computed } from 'mobx';

export class MainStore {
  @observable status;
  @observable modal;
  @observable rooms;

  constructor() {
    this.reset();
  }

  reset() {
    this.rooms = [];
    this.modal = '';
    this.status = 'loading';
  }
}

export const mainStore = new MainStore();