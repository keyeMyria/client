import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import {
  setBanFormStore,
  setRoleFormStore,
  roomProfileStore,
  roomSetBanFormStore,
  roomSetRoleFormStore
} from 'stores';

import { Access } from 'helpers/access';
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuItem,
  Button
} from 'uikit';

const Box = styled(DropdownMenu)`
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: 10px;
  position: relative;
`;

const Target = styled.div`
  padding: 10px;
  cursor: pointer;
`;

const MenuDivider = styled.div`
  border-top: 1px solid ${theme.dark2};
  margin: 2px 0;
`;

const MenuContent = styled(DropdownMenuContent)`
  position: absolute;
  right: 0;
  top: 36px;
  min-width: 200px;
  background: ${theme.accent1};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 4px;

  :before {
    position: absolute;
    pointer-events: none;
    border: solid rgba(0, 0, 0, 0);
    content: '';
    height: 0;
    width: 0;
    bottom: 100%;
    right: 12px;
    border-width: 5px;
    margin: 0 -6px;
    border-bottom-color: ${theme.accent1};
  }
`;

const MenuItem = styled(DropdownMenuItem)`
  font-size: 13px;
  height: 36px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.accent1.lighten(1.5)};
  transition: background .12s ease-in, color .12s ease-in, box-shadow .12s ease-in;

  :hover {
    color: ${theme.accent1.lighten(2)};
    background: ${theme.accent1.lighten(0.2)};
  }

  :first-child {
    border-radius: 4px 4px 0 0;
  }

  :last-child {
    border-radius: 0 0 4px 4px;
  }
`;

export class RoomProfileMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  openBanForm() {
    roomProfileStore.close();
    setBanFormStore.setAndOpen(this.props.user);
  }

  openRoleForm() {
    roomProfileStore.close();
    setRoleFormStore.setAndOpen(this.props.user);
  }

  openRoomBanForm() {
    roomProfileStore.close();
    roomSetBanFormStore.setAndOpen(this.props.user);
  }

  openRoomRoleForm() {
    roomProfileStore.close();
    roomSetRoleFormStore.setAndOpen(this.props.user);
  }
  
  render() {
    const { roomId, user } = this.props;

    let roomManage = null;

    if (!!roomId) {
      roomManage = [
        <MenuDivider key={'d1'} />,
        <Access name="setRoleRoom" context={user} key={'setRoleRoom'}>
          <MenuItem onClick={() => this.openRoomRoleForm()}>
            {`Set Role In Room`}
          </MenuItem>
        </Access>,
        <Access name="banUserRoom" context={user} key={'setBanRoom'}>
          <MenuItem onClick={() => this.openRoomBanForm()}>
            {`Ban In Room`}
          </MenuItem>
        </Access>,
      ];
    }

    return (
      <Box>
        <DropdownMenuButton>
          <Target>
            <i className='zmdi zmdi-more-vert'></i>
          </Target>
        </DropdownMenuButton>
        <MenuContent>
          <Access name="setRole" context={user}>
            <MenuItem onClick={() => this.openRoleForm()}>
              {`Set Global Role`} 
            </MenuItem>
          </Access>
          <Access name="banUser" context={user}>
            <MenuItem onClick={() => this.openBanForm()}>
              {`Set Global Ban`}
            </MenuItem>
          </Access>
          {roomManage}
        </MenuContent>
      </Box>
    );
  }
}