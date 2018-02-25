import React from 'react';
import { RoomUsers } from 'components/room/chat/users';
import { roomUsersStore } from 'stores';
import { getRoomUsers } from 'queries/getRoomUsers';

export class RoomUsersContainer extends React.Component {
  componentDidMount() {
    getRoomUsers();
  }

  componentWillUnmount() {
    roomUsersStore.reset();
  }

  render() {
    return <RoomUsers />
  }
}