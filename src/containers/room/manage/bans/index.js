import React from 'react';
import { RoomBansManager } from 'components/room/manage/bans';
import { roomBansStore } from 'stores';
import { get as getUsers } from 'actions/room/bans';

export class RoomBansContainer extends React.Component {
  componentDidMount() {
    getUsers();
  }

  componentWillUnmount() {
    roomBansStore.reset();
  }

  render() {
    return <RoomBansManager />
  }
}