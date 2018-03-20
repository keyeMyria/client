import React from 'react';
import { RoomCollection } from 'components/room/collection';
import { roomCollectionStore } from 'stores';
import { getRoomCollection } from 'queries/getRoomCollection';

export class RoomCollectionContainer extends React.Component {
  componentDidMount() {
    getRoomCollection();
  }

  componentWillUnmount() {
    roomCollectionStore.reset();
  }
  
  render() {
    return <RoomCollection />
  }
}