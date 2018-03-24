import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { shortNumbers, humanNumbers } from 'utils';

const Box = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  font-size: 14px;
  position: relative;
  padding: 0 14px;
  cursor: pointer;

  :hover {
    background: ${theme.dark2.darken(0.4)};
  }
`;

const Left = styled.div`
  width: 38px;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background: ${theme.dark2};
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: ${theme.dark2};
`;

const Right = styled.div`
  width: calc(100% - 38px - 20px);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.accent2.lighten(0.4)};
`;

const Content = styled.div`
  padding-top: 2px;
  font-size: 12px;
  font-weight: 500;
  color: ${theme.accent2.darken(0.3)};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const LeftPanelFriend = ({
  avatar,
  name,
  status,
  online
}) => (
  <Box>
    <Left>
      <Avatar>
        <AvatarImg src={avatar} />
      </Avatar>
    </Left>
    <Right>
      <Title title={name}>{name}</Title>
      <Content title={status}>{status}</Content>
    </Right>
  </Box>
);