import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const height = 24;
const heightInner = 18;
const padding = (height - heightInner) / 2;

const Box = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: ${({ isActive }) => isActive ? 'flex-end' : 'flex-start'};
  height: ${height}px;
  width: ${height * 2}px;
  background: ${({ isActive }) => isActive ? theme.green : theme.dark1};
  border-radius: ${height / 2}px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

const Slider = styled.div`
  margin: ${padding}px;
  height: ${heightInner}px;
  width: ${heightInner}px;
  border-radius: ${heightInner / 2}px;
  background: ${({ isActive }) => isActive ? theme.text1 : theme.accent2};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

export const Switch = ({ checked, onChange }) => (
  <Box
    isActive={checked}
    onClick={() => onChange()}>
    <Slider isActive={checked} />
  </Box>
);