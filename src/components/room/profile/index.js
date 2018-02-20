import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

import { getRoomRoleTitle, getSiteRoleTitle } from 'utils/roles';
import { TextField } from 'components/ui';
import Access from 'components/ui/access';
import { RoomProfileMenu } from './menu';

const Box = styled.div`
  width: 500px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 6px;
`;

const UserAvatarBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  background: ${theme.accent1};
`;

const UserAvatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;


const UserBox = styled.div`
  display: block;
  padding: 0 20px;
`;

const Username = styled.div`
  font-size: 16px;
`;

const SiteRole = styled.div`
  padding-top: 2px;
  font-size: 13px;
  color: ${theme.accent2};
`;

const RoomRole = styled.div`
  padding-top: 2px;
  font-size: 13px;
  color: ${theme.accent2};
`;

const Actions = styled.div`
  display: flex;
  margin-left: auto;
  justify: flex-end;
  padding: 0 10px;
`;

const Action = styled.div`
  color: ${theme.accent2};
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  display: flex;
  align-items: center;

  :hover {
    color: ${theme.text1};
  }
`;

const Body = styled.div`
  border-top: 1px solid ${theme.dark1};
  padding: 10px 0;
`;

@inject('roomStore', 'roomProfileStore')
@observer
export class RoomProfile extends React.Component {
  render() {
    const { roomStore, roomProfileStore } = this.props;
    const { user } = roomProfileStore;

    if (!user) {
      return null;
    }

    const siteRoleTitle = getSiteRoleTitle(user.site.role);
    const roomRoleTitle = getRoomRoleTitle(user.room.role);

    return (
      <Box>
        <Header>
          <Left>
            <UserAvatarBox>
              {user.site.avatar && <UserAvatar src={user.site.avatar} />}
            </UserAvatarBox>
          </Left>
          <UserBox>
            <Username>{user.site.name}</Username>
            {!!siteRoleTitle && <SiteRole>{siteRoleTitle}</SiteRole>}
            {!!roomRoleTitle && <RoomRole>{roomRoleTitle}</RoomRole>}
          </UserBox>
          <Actions>
            <Access name="profileMenu">
              <RoomProfileMenu roomId={roomStore.id} user={user} />
            </Access>
          </Actions>
        </Header>
      </Box>
    );
  }
}