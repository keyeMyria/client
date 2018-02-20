import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center; 
  text-align: center;
  padding: 0 14px;
  height: 32px;
	font-size: 12.5px;
	background: ${({mainColor}) => mainColor};
  border-top-left-radius: ${({isFirst, isIn}) => isFirst || isIn ? '3px': '0'};
  border-top-right-radius: ${({isLast, isIn}) => isLast || isIn ? '3px': '0'};
  border-bottom-right-radius: ${({isLast, isIn}) => isLast || isIn ? '3px': '0'};
  border-bottom-left-radius: ${({isFirst, isIn}) => isFirst || isIn ? '3px': '0'};
  ${({ isGroup }) => !isGroup && `border-radius: 3px;` }
	cursor: pointer;
	color: ${({mainColor}) => mainColor.lighten(1.5)};
	border: none;
  ${({ isGroup, isLast }) => (isGroup || !isLast) && `margin-right: 1px;` }
	outline: none;
  transition: background .12s ease-in, color .12s ease-in, box-shadow .12s ease-in;

  i {
    font-size: 15px;
  }

  :focus {
    background: ${({mainColor}) => mainColor.lighten(0.1)};
  }

  :hover {
    background: ${({mainColor}) => mainColor.lighten(0.2)};
  }
`;

export default ({
  children,
  color = theme.accent1,
  isGroup = false,
  isFirst = false,
  isLast = false,
  onClick = () => {}
}) => (
  <Button 
    isGroup={isGroup}
    isFirst={isFirst}
    isLast={isLast}
    isIn={isGroup && !isFirst && !isLast}
    mainColor={color}
    onClick={() => onClick()}>{children}</Button>
);