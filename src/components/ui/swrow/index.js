import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import Switch from 'components/ui/switch';

const SRow = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.accent1};
  align-items: center;  
`;

const SRowLeft = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SRowTitle = styled.div`
  height: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const SRowDescription = styled.div`
  padding-top: 5px;
  font-size: 12.5px;
  color: ${theme.accent2};
`;

const SRowRight = styled.div`
  margin-left: auto;
  height: 100%;
`;

const SRowSwitch = styled.div`
  padding: 10px;
`;

export default ({ title, description, isActive, onChange }) => (
  <SRow>
    <SRowLeft>
      <SRowTitle>{title}</SRowTitle>
      {!!description && <SRowDescription>{description}</SRowDescription>}
    </SRowLeft>
    <SRowRight>
      <SRowSwitch>
        <Switch
          checked={isActive}
          onChange={() => onChange()} />
      </SRowSwitch>
    </SRowRight>
  </SRow>
);