import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
`;

const Message = styled.div`
  margin: auto;
  font-size: 18px; 
`;

export const Loading = ({ children }) => (
  <Box>
    <Message>{children}</Message>
  </Box>
);