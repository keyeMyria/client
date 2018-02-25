import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import Access from 'components/ui/access';
import { unbanUserRoom } from 'mutations/unbanUserRoom';

const Box = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  position: relative;

  :hover {
    background: ${theme.dark2.lighten(0.2)};
  }
`;

const Num = styled.div`
  min-width: 60px;
  font-size: 14px;
  color: ${theme.accent2};
  padding: 0 20px;
`;

const Username = styled.div`
  font-size: 15px;
  padding: 0 10px;
`;

const Manage = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  margin-right: 10px;
  z-index: 100;

  ${Box}:hover & {
    display: flex;
  }
`;

const ManageItem = styled.div`
  font-size: 20px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  height: 100%;
  color: ${theme.accent2};
  cursor: pointer;

  &:hover {
    color: ${theme.text1};
  }
`;

export class RoomUserBan extends React.PureComponent {
  render() {
    const { index, user } = this.props;

    return (
      <Box>
        <Num>{index + 1}</Num>
        <Username>{user.name}</Username>
        <Manage>
          <ManageItem onClick={() => unbanUserRoom(user.id)}>
            <i className="zmdi zmdi-close"></i>
          </ManageItem>
        </Manage>
      </Box>
    )
  }
}