import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';

import { LeftPanelRoom } from './Room';

const Empty = styled.div`
  padding: 14px 0;
  font-size: 12px;
  color: ${theme.accent2.darken(0.1)};
  text-align: center;
`;

@inject('followRoomsStore')
@observer
export class FollowRooms extends React.Component {
  render() {
    const rooms = this.props.followRoomsStore.rooms.slice();

    return (
      <React.Fragment>
      {rooms.length === 0 &&
        <Empty>
          <FormattedMessage id="leftPanel.following.none"/>
        </Empty>}
        {rooms.map(room => 
          <LeftPanelRoom key={room.id} {...room} />
        )}
      </React.Fragment>
    );
  }
}