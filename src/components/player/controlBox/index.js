import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { PlayerControl } from '../control';

export const Container = styled.div`
	background: ${theme.dark1};
	padding-bottom: 56.25%;
	position: relative;
	display: block;
	height: 0;
	overflow: hidden;
`;

const Box = styled.div`
	visibility: hidden;
	transition: all .2s ease;

	${Container}:hover & {
		visibility: visible;
	}
`;

@inject('roomModeWaitlistStore')
@observer
export class PlayerControlBox extends React.Component {
  render() {
    const { clientStart, source } = this.props.roomModeWaitlistStore.playData;
        
    return (
      <Box>
			  <PlayerControl
          start={clientStart}
          duration={source ? source.duration : 0}
        />
		  </Box>
    );
  }
}