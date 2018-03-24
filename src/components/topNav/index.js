import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { router } from 'utils/router';
import { Caret } from 'uikit';
import Button from './button';
import { TopNavUser } from './user';
import { Logo } from './logo';

const TopNav = styled.div`
  display: flex;
  height: 100%;
  background: ${theme.dark2};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
`;

const LogoLink = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Lang = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${theme.accent2};
`;

const MenuItem = styled.a`
  display: flex;
  color: ${theme.accent2};
  font-size: 12.5px;
  align-items: center;
  padding: 0 14px;
  cursor: pointer;
  height: 100%;

  :hover {
    color: ${theme.accent2.lighten(0.2)};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
`;

export default ({ children }) => (
  <TopNav>
    <Left>
      <LogoLink onClick={() => router.navigate(`/${name}`)}><Logo /></LogoLink>
      {/* <Lang>RU</Lang><Caret /> */}
      <MenuItem href="https://vk.com/ravepro" target="_blank">VK</MenuItem>
      <MenuItem href="https://discord.gg/bhJPuNe" target="_blank">Discord</MenuItem>
      <MenuItem href="https://github.com/ravepro/client" target="_blank">GitHub</MenuItem>
    </Left>
    <Right>
      <TopNavUser />
    </Right>
  </TopNav>
);