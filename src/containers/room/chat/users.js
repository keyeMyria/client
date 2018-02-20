import React from 'react';
import { RoomUsers } from 'components/room/chat/users';
import { roomUsersStore } from 'stores';
import { get as getUsers } from 'actions/room/users';

export class RoomUsersContainer extends React.Component {
  componentDidMount() {
    getUsers();
  }

  componentWillUnmount() {
    roomUsersStore.reset();
  }

  render() {
    return <RoomUsers />
  }
}