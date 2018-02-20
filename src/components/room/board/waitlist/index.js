import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

import { WaitlistPlayer } from './player';
import { RoomBoardAboutWaitlist } from './about';

const Box = styled.div`
	height: 100%;
	width: 100%;
`;

const BoardPlayer = styled.div`
	position: relative;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const BoardAbout = styled.div`
	margin: 16px 0;
`;

@inject('roomModeWaitlistStore')
@observer
export class RoomBoardWaitlist extends React.Component {
	render() {
		const { playData } = this.props.roomModeWaitlistStore;

		return (
			<Box>
				<BoardPlayer>
					<WaitlistPlayer playing={playData} />
				</BoardPlayer>
				<BoardAbout>
					<RoomBoardAboutWaitlist />
				</BoardAbout>
			</Box>
		);
	}
}