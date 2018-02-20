import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

export default styled.div`
  display: flex;
  color: ${theme.accent2};
  font-size: 13.5px;
  align-items: center;
  padding: 0 14px;
  cursor: pointer;
  height: 100%;

  :hover {
    color: ${theme.accent2.lighten(0.2)};
  }
`;