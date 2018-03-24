import React from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';
import { wsAPI } from 'utils/wsapi';
import { roomStore, userRoomStore } from 'stores';

import { Loading } from 'uikit/loading';
import { Room } from 'components/room';
import { RoomBanned } from 'components/room/banned';
import RoomNotFound from 'components/room/notFound';
import RoomUserBanned from 'components/room/userBanned';

import { getRoomByName } from 'queries/getRoomByName';

export class RoomContainer extends React.Component {
  constructor(props) {
		super(props);
    this.disposers = [];
    this.state = {
      status: 'loading'
    };
  }

  componentDidMount() {
    this.disposers = [
      reaction(() => roomStore.status, status => {
				this.setState({ status });
			})
    ];

    const { roomName } = this.props.routeParams;
    getRoomByName(roomName);
  }

  componentWillReceiveProps(nextProps) {
    wsAPI.action('leave');
    roomStore.reset();
    userRoomStore.reset();
    getRoomByName(nextProps.routeParams.roomName);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.routeParams.roomName != this.props.routeParams.roomName ||
      nextState.status != this.state.status
    );
  }

  componentWillUnmount() {
    wsAPI.action('leave');
    roomStore.reset();
    userRoomStore.reset();
  }

  render() {
    switch (this.state.status) {
      case 'loading':
        return <Loading>Loading...</Loading>
      case 'error':
        return <Loading>Error</Loading>
      case 'ready':
        return <Room />
      case 'notfound':
        return <RoomNotFound />
      case 'banned':
        return <RoomBanned roomName={this.props.routeParams.roomName} />
      case 'userbanned':
        return <RoomUserBanned />
      default:
        return null;
    }
  }
}