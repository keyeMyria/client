import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

export Box from './box';

export const Target = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  background: ${({ isActive }) => isActive ? theme.dark2.lighten(0.25) : 'none'};

  i {
    color: ${({ isActive }) => isActive ? theme.text1 : 'inherit'};
  }

  :hover {
    background: ${({ isActive }) => theme.dark2.lighten(isActive ? 0.25 : 0.1)};
  }
`;

export const Menu = styled.div`
  ${({ isClose }) => isClose && 'display: none;'}
  position: absolute;
  box-shadow: 0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23);
  right: 10px;
  top: 58px;
  background: ${theme.accent1};
  width: 180px;
  border-radius: 4px;

  :before {
    position: absolute;
    pointer-events: none;
    border: solid rgba(0, 0, 0, 0);
    content: '';
    height: 0;
    width: 0;
    bottom: 100%;
    right: 40px;
    border-width: 5px;
    margin: 0 -6px;
    border-bottom-color: ${theme.accent1};
  }
`;

export const Content = styled.div`
  border-bottom: 1px solid ${theme.dark1};
  padding: 12px 10px;
`;

export const Actions = styled.div`
  font-size: 13px;
`;

export const Action = styled.div`
  height: 36px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.accent1.lighten(1.5)};

  :hover {
    color: ${theme.accent1.lighten(2)};
    background: ${theme.accent1.lighten(0.2)};
  }

  :last-child {
    border-radius: 0 0 4px 4px;
  }
`;