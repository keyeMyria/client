import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { theme } from 'colors';

import { shortNumbers, humanNumbers } from 'utils';
import Access from 'components/ui/access';
import { ButtonGroup, Button } from 'components/ui';

import { follow } from 'actions/room/follow';
import { unfollow } from 'actions/room/unfollow';

const Box = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
`;

const Left = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const RoomInfoBox = styled.div`
  display: flex;
  height: 38px;
  align-items: center;
  color: ${theme.accent1.lighten(2.3)};
  background: ${theme.accent1};
  padding: 0 10px;
  border-radius: 3px;
`;

const RoomTitle = styled.div`
  max-width: 200px;
  padding: 0 5px;
  font-size: 13.5px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AvatarBox = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  margin: 0 8px 0 0;
  align-items: center;
  border-radius: 100%;
`;

const AvatarImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
  user-select: none;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
`;

const MenuItem = styled.button`
  border: none;
  outline: none;
  display: flex;
  height: 32px;
  align-items: center;
  background: ${theme.dark2};
  color: ${theme.accent2};
  padding: 0 14px;
  font-size: 12.5px;
  cursor: pointer;
  border-radius: 3px;
  transition: background .12s ease-in, color .12s ease-in, box-shadow .12s ease-in;

  :hover {
    color: ${theme.accent2.lighten(0.3)};
    background: ${theme.dark2.lighten(0.3)};
  }
`;

const Right = styled.div`
  display: flex;
  margin-left: auto;
  height: 100%;
  align-items: center;
`;

const Follow = styled.div`
  margin: 0 5px;
  display: flex;
  height: 100%;
  align-items: center;
  user-select: none;
`;

const FollowIcon = styled.div`
  padding: 0 3px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 10px;
`;

const FollowCount = styled.div`
  font-size: 13px;
  color: ${theme.accent2};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
`;

const FollowBox = styled.div``;

@inject('roomStore', 'userStore', 'userRoomStore')
@observer
export class RoomTopNav extends React.Component {
  openRoomManage() {
    this.props.roomStore.tab = 'manage';
  }

  render() {
    const { roomStore, userRoomStore } = this.props;

    return (
      <Box>
        <Left>
          <RoomInfoBox>
            <AvatarBox>
              {roomStore.avatar && <AvatarImg src={roomStore.avatar}/>}
            </AvatarBox>
            <RoomTitle>{roomStore.title}</RoomTitle>
          </RoomInfoBox>
          <Menu>
            {/* <MenuItem>Collection</MenuItem>
            <MenuItem>History</MenuItem> */}
            <Access name="manageRoom">
              <MenuItem onClick={() => this.openRoomManage()}>Manage</MenuItem>
            </Access>
          </Menu>
        </Left>
        <Right>
          <FollowBox>
            <ButtonGroup>
              {userRoomStore.follower ? 
                <Button
                  color={theme.accent1.darken(0.12)}
                  onClick={() => unfollow()}>
                  <FormattedMessage
                    id="room.topNav.following"
                    defaultMessage="Following" />
                </Button>
              :
                <Button
                  color={theme.accent1.lighten(0.3)}
                  onClick={() => follow()}>
                  <FormattedMessage
                    id="room.topNav.follow"
                    defaultMessage="Follow" />
                </Button>
              }
              <Button>{humanNumbers(roomStore.followersCount)}</Button>
            </ButtonGroup>
          </FollowBox>
        </Right>
      </Box>
    );
  }
}