import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const ButtonGroup = styled.div`
  display: inline-flex;
`;

export default ({ children }) => (
  <ButtonGroup>
    {React.Children.map(children, (child, index) => (
      React.cloneElement(child, {
        isGroup: true,
        isFirst: index === 0,
        isLast: index + 1 === React.Children.count(children)
      })
    ))}
  </ButtonGroup>
);