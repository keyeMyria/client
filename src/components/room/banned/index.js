import React from 'react';
import { inject } from 'mobx-react';
import { router } from 'utils/router';
import styled from 'styled-components';
import { theme } from 'colors';
import { Access } from 'helpers/access';
import { Button } from 'uikit';
import { Loading } from 'uikit/loading';

import { unbanRoomByName } from 'mutations/unbanRoomByName';

const Bottom = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`;

const Message = styled.div``;

const Unban = styled.span`
  padding: 0 5px;
`;

@inject('roomStore')
export class RoomBanned extends React.Component {
  unbanRoom = () => {
    unbanRoomByName(this.props.roomName);
  }

  render() {
    return (
      <Loading>
        <Message>Комната заблокирована за нарушение правил сообщества.</Message>
        <Bottom>
          <Button onClick={() => router.navigate(`/`)}>На главную</Button>
          <Access name="unbanRoom">
            <Unban>
              <Button onClick={this.unbanRoom}>Разблокировать</Button>
            </Unban>
          </Access>
        </Bottom>
      </Loading>
    );
  }
}