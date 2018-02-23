import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Access } from 'components/ui/access';
import { ButtonGroup, Button, Modal } from 'components/ui';
import { RoomWaitlistSettings } from './menu';
import { addUser, removeUser, kickUser } from 'actions/room/waitlist';

const Box = styled.div`
	display: flex;
	min-height: 42px;
`;

const Left = styled.div`display: flex;`;

const Avatar = styled.div`
	height: 42px;
	width: 42px;
	margin-right: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const AvatarImg = styled.img`
	max-height: 100%;
	max-width: 100%;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Middle = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
`;

const PlayInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`font-size: 14px;`;

const User = styled.div`
	font-size: 13px;
	color: ${theme.accent2};
	margin-top: 2px;
`;

const Right = styled.div`
	display: flex;
	align-items: center;
`;

const ActionBox = styled.div`
	display: flex;
	align-items: center;
`;

const ActionButton = styled.button`
	border: none;
	outline: none;
	display: flex;
	height: 32px;
	align-items: center;
	background: ${theme.dark2};
	color: ${theme.accent2};
	padding: 0 14px;
	font-size: 12.5px;
	cursor: pointer;
	border-radius: 3px;
	transition: background .12s ease-in, color .12s ease-in, box-shadow .12s ease-in;

	:hover {
		color: ${theme.accent2.lighten(0.3)};
		background: ${theme.dark2.lighten(0.3)};
	}
`;

const MyPlaylistButton = styled(ActionButton)`
  margin-right: 10px;
`;

const FocusNumber = styled.span``;

const HideNumber = styled.span`
	color: ${theme.accent2.darken(0.15)};
	margin-left: 4px;
`;

@inject('roomModeWaitlistStore', 'userStore', 'roomStore')
@observer
export class RoomBoardAboutWaitlist extends React.Component {
	waitlistAdd() {
		addUser();
	}

	waitlistKick() {
		kickUser();
	}
	
	waitlistRemoveUser(userId) {
		removeUser(userId);
	}

	render() {
		const { roomModeWaitlistStore, userStore, roomStore } = this.props;
		const currentUserId = userStore.id;
		const playData = roomModeWaitlistStore.playData;
		const users = roomModeWaitlistStore.users;

		const noPlaying = !playData.source;
		const currentIsPlaying = !!(playData.user && playData.user.id == currentUserId);
		const currentWaitPosition = users.findIndex((u) => u.id == currentUserId);
		const currentIsWait = currentWaitPosition >= 0;

		let usersCountView = users.length;

		// Start Playing (waitlistAdd) - noPlaying
		let actionView = (
			<Button onClick={() => this.waitlistAdd()}>
				{noPlaying ? 'Start Playing' : 'Join Playing'}
			</Button>
		);

		if (currentIsPlaying) {
			actionView = (
				<Button
					color={theme.accent1.darken(0.15)}
					onClick={() => this.waitlistKick()}>
					{'Leave Playing'}
				</Button>
			);
		}

		if (currentIsWait) {
			actionView = (
				<Button
					color={theme.accent1.darken(0.15)}
					onClick={() => this.waitlistRemoveUser(currentUserId)}>
					{'Leave Waitlist'}
				</Button>
			);

			usersCountView = (
				<React.Fragment>
					<FocusNumber>{currentWaitPosition + 1}</FocusNumber>
					<HideNumber>/ {users.length}</HideNumber>
				</React.Fragment>
			);
		}

		return (
			<Box>
				<Left>
					{playData.source && <Avatar>{playData.source && <AvatarImg src={playData.source.cover} />}</Avatar>}
				</Left>
				<Middle>
					{playData.source && (
						<PlayInfo>
							<Title>{playData.source.title}</Title>
							<User>{playData.user.name}</User>
						</PlayInfo>
					)}
				</Middle>
				<Right>
					<ActionBox>
						<Access name="modeWaitlistOpenMyPlaylist">
							<MyPlaylistButton onClick={() => roomStore.tab = 'waitlistModePlaylist'}>
								{'My Playlist'}
							</MyPlaylistButton>
						</Access>
						<ButtonGroup>
							{actionView}
							<Button onClick={() => roomStore.tab = 'waitlistModeUsers'}>{usersCountView}</Button>
						</ButtonGroup>
					</ActionBox>
					<Access name="waitlistMenu">
						<RoomWaitlistSettings />
					</Access>
				</Right>
			</Box>
		);
	}
}

// Start Playing (waitlistAdd) - noPlaying
// Leave Playing (waitlistKick) - current.isPlaying
// Leave Waitlist (waitlistRemove) - current.isWait

// 5 - current.isPlaying || current.noWait
// 5/10 - current.isWait (currentPosition/waitCount)
