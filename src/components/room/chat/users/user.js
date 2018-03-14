import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import {
  roomProfileStore,
  roomSetBanFormStore,
  roomSetRoleFormStore
} from 'stores';

import {
  getRoomRoleTitle,
  getSiteRoleTitle,
} from 'utils/roles';
import { Access } from 'helpers/access';

const Box = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  font-size: 14px;
  position: relative;
  padding: 0 20px;

  :hover {
    background: ${theme.dark2.darken(0.4)};
  }
`;

const Left = styled.div`
  width: 42px;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background: ${theme.dark2};
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: ${theme.dark2};
  }
`;

const Right = styled.div`
  width: calc(100% - 42px);
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.cColor || theme.accent2};
`;

const Role = styled.div`
  padding-top: 2px;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.accent2.darken(0.3)};
`;

const ManageItem = styled.div`
  padding: 0 10px;
  color: ${theme.accent2};
  cursor: pointer;

  i {
    font-size: 18px;
  }

  :hover {
    color: ${theme.text1};
  }
`;

const ManageMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  min-width: 45px;
  height: 100%;
  padding: 0 10px;
  align-items: center;
  justify-content: center;

  ${Box}:hover & {
    display: flex;
  }
`;

export class RoomUser extends React.Component { 
  openProfile = () => {
    roomProfileStore.setAndOpen(this.props.user);
  }

  openBanForm = () => {
    roomSetBanFormStore.setAndOpen(this.props.user);
  }

  openRoleForm = () => {
    roomSetRoleFormStore.setAndOpen(this.props.user);
  }
  
  render() {
    const { user, showRole, color } = this.props;
    let viewRole = "";

    if (showRole == "site") {
      viewRole = getSiteRoleTitle(user.site.role);
    }

    if (showRole == "room") {
      viewRole = getRoomRoleTitle(user.room.role);
    }    
    return (
      <Box>
        <Left>
          <Avatar onClick={this.openProfile}>
            {user.site.avatar && <img src={user.site.avatar} />}
          </Avatar>
        </Left>
        <Right>
          <Name cColor={color}>{user.site.name}</Name>
          {!!viewRole && <Role>{viewRole}</Role>}
        </Right>
        <ManageMenu>
          <Access name="setRoleRoom" context={user}>
            <ManageItem onClick={this.openRoleForm}>
              <i className="zmdi zmdi-swap-vertical"></i>
            </ManageItem>
          </Access>
          <Access name="banUserRoom" context={user}>
            <ManageItem onClick={this.openBanForm}>
              <i className="zmdi zmdi-block"></i>
            </ManageItem>
          </Access>
        </ManageMenu>
      </Box>
    );
  }
}