import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

import Access from 'components/ui/access';
import SWRow from 'components/ui/swrow';

import { changeFollowerMode } from 'actions/room/changeFollowerMode';
import { changeSlowMode } from 'actions/room/changeSlowMode';

const Box = styled.div``;

@inject('roomStore')
@observer
export class RoomChatManager extends React.Component {
  render() { 
    const { followerMode, slowMode } = this.props.roomStore;

    return (
      <Box>
        <Access name="changeFollowerMode">
          <SWRow 
            title="Follower Mode"
            description="В чат могут писать только подписчики, которые подписались более 30 минут назад"
            isActive={followerMode}
            onChange={() => changeFollowerMode()}/>
        </Access>
        <Access name="changeSlowMode">
          <SWRow 
            title="Slow Mode"
            description="Включить задержку между отправкой сообщений в чате (2 секунды)"
            isActive={slowMode}
            onChange={() => changeSlowMode()}/>
        </Access>
      </Box>
    );
  }
}