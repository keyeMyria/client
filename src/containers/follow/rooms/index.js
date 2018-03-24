import React from 'react';
import { FollowRooms } from 'components/leftPanel/Rooms';
import { followRoomsStore } from 'stores';
import { getFollowRooms } from 'queries/getFollowRooms';

export class FollowRoomsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;
  }
  
  componentDidMount() {
    getFollowRooms();

    this.timer = setInterval(() => {
      getFollowRooms();
    }, 30 * 1000);
  }

  componentWillMount() {
    clearInterval(this.timer);
  }

  componentWillUnmount() {
    followRoomsStore.reset();
  }
  
  render() {
    return <FollowRooms />
  }
}