import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const Box = styled.span`
  display: flex;
  padding: 4px 18px 0;
  font-size: 15px;
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
  user-select: none;
`;

const Left = styled.span``;

const Right = styled.div`
  color: ${theme.ravepro};
`;

export const Logo = () => (
  <Box>
    <Left>Rave</Left><Right>Pro</Right>
  </Box>
);