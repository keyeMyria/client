import React from 'react';
import { inject, observer } from 'mobx-react';
import { wsAPI } from 'utils/wsapi';
import { roomStore, userRoomStore } from 'stores';

import Loading from 'components/ui/loading';
import { Room } from 'components/room';
import { RoomBanned } from 'components/room/banned';
import RoomNotFound from 'components/room/notFound';
import RoomUserBanned from 'components/room/userBanned';

import { getByName } from 'actions/room';

@inject('roomStore')
@observer
export class RoomContainer extends React.Component {
  componentDidMount() {
    const { roomName } = this.props.routeParams;
    getByName(roomName);
  }

  componentWillUnmount() {
    wsAPI.action('leave');
    roomStore.reset();
    userRoomStore.reset();
  }

  render() {
    switch (this.props.roomStore.status) {
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