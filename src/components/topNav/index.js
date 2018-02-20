import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { router } from 'utils/router';

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
      {children}
    </Left>
    <Right>
      <TopNavUser />
    </Right>
  </TopNav>
);