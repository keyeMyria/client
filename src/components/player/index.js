import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

import { PlayerControl } from './control';
import { PlayerHtml5Audio } from './html5Audio';

const logo = 'https://ravepro.ams3.digitaloceanspaces.com/logo.jpg';

const Container = styled.div`
	background: ${theme.dark1};
	padding-bottom: 56.25%;
	position: relative;
	display: block;
	height: 0;
	overflow: hidden;
`;

const None = styled.div`
	display: block;
	top: 0;
	height: 100%;
	width: 100%;
	position: absolute;
`;

const Audio = styled.div`
	display: block;
	top: 0;
	height: 100%;
	width: 100%;
	position: absolute;
`;

const Video = styled.div`
	display: block;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;

	span {
		width: 100%;
		height: 100%;
	}

	iframe {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
`;

const Background = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
	overflow: hidden;
	background: ${theme.dark1};
`;

const Cover = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	text-align: center;
`;

const CoverImg = styled.img`
	height: calc(100% - 100px);
	display: block;
	border-radius: 4px;
	max-height: 50%;
	user-select: none;
	border-radius: 100%;
	border: 2px solid ${theme.accent1};

	${Audio} & {
		border-radius: 0;
	}
`;

const PlayerControlBox = styled.div`
	visibility: hidden;
	transition: all .2s ease;

	${Container}:hover & {
		visibility: visible;
	}
`;

@inject('roomStore')
@observer
export class PlayerNone extends React.Component {
	render() {
		const { cover, roomStore } = this.props;

		return (
			<Container>
				<None>
					<Background />
					<Cover>
						<CoverImg src={cover || roomStore.avatar} />
					</Cover>
				</None>
			</Container>
		);
	}
}

export const PlayerVideo = ({ children, start, duration }) => (
	<Container>
		<Video>{children}</Video>
		<PlayerControlBox>
			<PlayerControl start={start} duration={duration} />
		</PlayerControlBox>
	</Container>
);

export const PlayerAudio = ({ children, start, duration, cover }) => (
	<Container>
		<Audio>
			<Background />
			<Cover>
				<CoverImg src={cover} />
			</Cover>
			{children}
		</Audio>
		<PlayerControlBox>
			<PlayerControl start={start} duration={duration} />
		</PlayerControlBox>
	</Container>
);