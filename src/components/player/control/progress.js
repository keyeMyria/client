import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Line } from 'rc-progress';

const Progress = styled.div`
  display: flex;
  position: absolute;
  background: ${theme.accent1};
  height: 3px;
  width: 100%;
  top: 0;
  
  svg {
    height: 3px;
    width: 100%;

    .rc-progress-line-path {
      stroke: ${theme.accent2.darken(0.1)};
    }
  }
`;

export default ({ partValue = 0 }) => (
  <Progress>
    <Line
      percent={partValue}
      trailWidth="0"
      strokeLinecap="square"/>
  </Progress>
);