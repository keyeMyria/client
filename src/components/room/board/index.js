import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

import { RoomWaitlistContainer } from 'containers/room/waitlist';

const Box = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
 
export const BoardPlayer = styled.div`
  position: relative;
`;

export const BoardAbout = styled.div`
  margin: 16px 0;
`;

const RoomBoardNoneBox = styled.div`
  font-size: 15px;
`;

const RoomBoardNone = () => (
  <RoomBoardNoneBox>None mode</RoomBoardNoneBox>
);

@inject('roomStore')
@observer
export class RoomBoard extends React.Component {
  getContent = (mode) => {
    switch (mode) {
      case 'waitlist':
        return <RoomWaitlistContainer />
      default:
        return <RoomBoardNone />
    }
  }

  render() {
    return (
      <Box>{this.getContent(this.props.roomStore.mode)}</Box>
    );
  }
}