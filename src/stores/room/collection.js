import { observable, action, computed } from 'mobx';
import { wsAPI } from 'utils/wsapi';
import { reorder, getClientStartTime } from 'utils';
import { roomStore } from 'stores';

export class RoomCollectionStore {
  @observable sources;

  constructor() {
    this.reset();
  }

  reset() {
    this.sources = [];
  }

  addSource = (roomSource) => {
    this.sources.unshift(roomSource);
    roomStore.collectionCount = roomStore.collectionCount + 1;
  }

  removeSource = (id) => {
    this.sources = this.sources.filter(roomSource => {
      return roomSource.id != id;
    });

    roomStore.collectionCount = roomStore.collectionCount - 1;
  }

}

export const roomCollectionStore = new RoomCollectionStore();