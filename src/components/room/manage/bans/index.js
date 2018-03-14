import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

import { Access } from 'helpers/access';
import { RoomUserBan } from './ban';

const Box = styled.div`
`;

const Title = styled.div`
  font-size: 20px;
  color: ${theme.text1};
  padding-bottom: 10px;
`;

const Empty = styled.div`
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
  color: ${theme.accent2};
`;

@inject('roomBansStore')
@observer
export class RoomBansManager extends React.Component {
  render() { 
    const { users } = this.props.roomBansStore;

    return (
      <Box>
        {users.length == 0 && <Empty>В этой комнате никто не забанен.</Empty>}
        {users.map((user, index) => 
          <RoomUserBan key={user.user.id} index={index} {...user} />
        )}
      </Box>
    )
  }
}