import React from 'react';
import { Chat } from 'components/room/chat';
import { roomChatStore } from 'stores';

export class RoomChatContainer extends React.Component {
  componentWillUnmount() {
    roomChatStore.reset();
  }

  render() {
    return <Chat />
  }
}