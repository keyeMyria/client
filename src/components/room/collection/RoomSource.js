import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { timeFormat } from 'utils';

const Box = styled.div`
  display: flex;
  min-height: 32px;
  padding: 5px 12px;

  &:hover {
    background: ${theme.dark2.darken(0.1)};
  }
`;

const Cover = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 14px;
  background: ${theme.accent1};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoverImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const Middle = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex: 1;
`;

const Title = styled.div`
  font-size: 13px;
`;

const Duration = styled.div`
  font-size: 12px;
  color: ${theme.accent2};
  margin-left: auto;

  ${Box}:hover & {
    display: none;
  }
`;

const Actions = styled.div`
  display: none;
  align-items: center;
  
  ${Box}:hover & {
    display: flex;
  }
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 12px;
  color: ${theme.accent2};
  cursor: pointer;

  &:hover {
    color: ${theme.accent2.lighten(0.5)};
  }
`;

export const RoomSource = ({
  pos,
  cover,
  title,
  duration,
  children
}) => (
  <Box>
    <Cover>
      <CoverImg src={cover} />
    </Cover>
    <Middle>
      <Info>
        <Title>{title}</Title>
        <Duration>{timeFormat(duration)}</Duration>
      </Info>
    </Middle>
    <Actions>
      {children}
    </Actions>
  </Box>
);