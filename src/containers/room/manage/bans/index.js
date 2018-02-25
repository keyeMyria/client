import React from 'react';
import { RoomBansManager } from 'components/room/manage/bans';
import { roomBansStore } from 'stores';
import { getRoomBans } from 'queries/getRoomBans';

export class RoomBansContainer extends React.Component {
  componentDidMount() {
    getRoomBans();
  }

  componentWillUnmount() {
    roomBansStore.reset();
  }

  render() {
    return <RoomBansManager />
  }
}