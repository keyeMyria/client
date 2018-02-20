import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const Caret = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  color: ${theme.accent2};
  font-size: 20px;

  i {
    margin-top: 2px;
  }
`;

export default () => (
  <Caret>
    <i className="zmdi zmdi-caret-down"></i>
  </Caret>
);