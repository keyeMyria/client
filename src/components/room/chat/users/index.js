import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';
import { RoomUser } from './user';

const Box = styled.div`
  height: calc(100% - 45px);
`;

const Block = styled.div`
  padding: 5px 0;
`;

const BlockTitle = styled.div`
  font-size: 12px;
  padding: 5px 20px 10px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${theme.accent2};
`;

const Users = styled.div`
  padding: 10px 0;
`;

const UsersEmpty = styled.div`
  color: ${theme.accent2};
  padding: 16px;
  font-size: 13px;
  text-align: center;
`;

const UsersBlock = ({ users, title, showRole, color }) => {
  
  if (!users || users.length == 0) {
    return null;
  }

  return (
    <Block>
      <BlockTitle>{title} — {users.length}</BlockTitle>
      {users.map(user => 
        <RoomUser
          color={color}
          key={user.site.id}
          user={user}
          showRole={showRole} />
      )}
    </Block>
  );
}

@inject('roomUsersStore')
@observer
export class RoomUsers extends React.Component {
  render() {
    const { users } = this.props.roomUsersStore;

    const siteStaff = users.filter(user => {
      return ['founder', 'admin', 'mod'].includes(user.site.role);
    });

    const roomStaff = users.filter(user => {
      return ['owner', 'manager', 'mod'].includes(user.room.role);
    });

    const others = users.filter(user => {
      const isSiteStaff = ['founder', 'admin', 'mod'].includes(user.site.role);
      const isRoomStaff = ['owner', 'manager', 'mod'].includes(user.room.role);

      return !isSiteStaff && !isRoomStaff;
    });

    if (users.length == 0) {
      return (
        <Box>
          <Scrollbars autoHide={true}>
            <Users>
              <UsersEmpty>
                {'No Users Online'}
              </UsersEmpty>
            </Users>
          </Scrollbars>
        </Box>
      );
    }
  
    return (
      <Box>
        <Scrollbars autoHide={true}>
          <Users>
            <UsersBlock
              title="Site Staff"
              showRole="site"
              color={theme.siteStaff}
              users={siteStaff} />
            <UsersBlock
              title="Room Staff"
              showRole="room"
              color={theme.roomStaff}
              users={roomStaff} />
            <UsersBlock title="Users" users={others} />
          </Users>
        </Scrollbars>
      </Box>
    );
  }
}