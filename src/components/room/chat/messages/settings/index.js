import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuItem
} from 'uikit';
import { createRoomMessage } from 'mutations/createRoomMessage';
import { clearRoomChat } from 'mutations/clearRoomChat';

const Menu = styled(DropdownMenu)`
  height: 100%;
  display: flex;
  position: relative;
  margin-right: -15px;
`;

const MenuButton = styled(DropdownMenuButton)`
  font-size: 18px;
  width: 36px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.accent2};
  cursor: pointer;

  :hover {
    color: ${theme.text1};
  }
`;

const MenuContent = styled(DropdownMenuContent)`
  min-width: 150px;
  background: ${theme.accent1};
  box-shadow: 0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23);
  border-radius: 4px;
  bottom: 60px;
  left: 5px;
  position: absolute;
  z-index: 22;

  :before {
    position: absolute;
    pointer-events: none;
    border: solid rgba(0, 0, 0, 0);
    content: '';
    height: 0;
    width: 0;
    top: 100%;
    left: 14px;
    border-width: 5px;
    margin: 0 -6px;
    border-top-color: ${theme.accent1};
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

const stressTest = (prefix = 0, count = 1000, delay = 10) => {
  let k = 0;

  let si = setInterval(() => {
    if (k > count) {
      return clearInterval(si);
    }

    createRoomMessage(`${prefix} - kek ${k}`);
    k++;
  }, delay);
}

const startTests = (pcount, scount, delay) => {
  for (let i = 0; i < pcount; i++) {
    stressTest(i, scount, delay);
  }
}

export class RoomChatSettings extends React.Component {
  render() {
    return (
      <Menu>
        <MenuButton>
          <i className="zmdi zmdi-more-vert"></i>
        </MenuButton>
        <MenuContent>
          <MenuItem onClick={() => startTests(1, 1000, 1)}>Stress test</MenuItem>
          <MenuItem onClick={() => clearRoomChat()}>Clear chat</MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}