import React from 'react';
import styled from 'styled-components';

const Loading = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
`;

const LoadingMessage = styled.div`
  margin: auto;
  font-size: 18px; 
`;

export default ({ children }) => (
  <Loading>
    <LoadingMessage>{children}</LoadingMessage>
  </Loading>
);