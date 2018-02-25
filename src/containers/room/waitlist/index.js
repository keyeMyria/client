import React from 'react';
import { RoomBoardWaitlist } from 'components/room/board/waitlist';
import { roomModeWaitlistStore } from 'stores';
import { getWaitlist } from 'queries/getWaitlist';

export class RoomWaitlistContainer extends React.Component {
  componentDidMount() {
    getWaitlist();
  }

  componentWillUnmount() {
    roomModeWaitlistStore.reset();
  }
  
  render() {
    return <RoomBoardWaitlist />
  }
}