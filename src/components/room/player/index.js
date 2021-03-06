import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { PlayerControlBox, Container } from './controlBox';

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

@inject('roomStore', 'roomModeWaitlistStore')
@observer
class SoundcloudCover extends React.Component {
	render() {
		const { source } = this.props.roomModeWaitlistStore.playData;
		const cover = (source && source.cover) || this.props.roomStore.avatar;

		return <CoverImg src={cover} />
	}
}

@inject('roomStore')
@observer
export class PlayerNone extends React.Component {
	render() {
		return (
			<Container>
				<None>
					<Background />
					<Cover>
						<CoverImg src={this.props.roomStore.avatar} />
					</Cover>
				</None>
			</Container>
		);
	}
}

export const PlayerVideo = ({ children }) => (
	<Container>
		<Video>{children}</Video>
		<PlayerControlBox />
	</Container>
);

export const PlayerAudio = ({ children }) => (
	<Container>
		<Audio>
			<Background />
			<Cover>
				<SoundcloudCover />
			</Cover>
			{children}
		</Audio>
		<PlayerControlBox />
	</Container>
);