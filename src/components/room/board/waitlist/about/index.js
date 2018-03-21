import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { theme } from 'colors';
import { Access } from 'helpers/access';
import { ButtonGroup, Button, Modal } from 'uikit';
import { RoomWaitlistSettings } from './menu';
import { waitlistAdd } from 'mutations/waitlistAdd';
import { waitlistRemoveUser } from 'mutations/waitlistRemoveUser';
import { waitlistKick } from 'mutations/waitlistKick';
import { humanNumbers } from 'utils';
import { checkAccess } from 'utils/access';
import { uniq } from 'ramda';

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

const PlaylistCount = styled.div`
  margin-left: 10px;
  font-size: 10.5px;
  color: ${theme.accent2.lighten(0.4)};
  display: flex;
  align-items: center;
  background: ${theme.dark2.lighten(0.3)};
  padding: 5px;
  border-radius: 5px;
`;

const FocusNumber = styled.span``;

const HideNumber = styled.span`
	color: ${theme.accent2.darken(0.15)};
	margin-left: 4px;
`;

@inject('roomModeWaitlistStore', 'userStore', 'userRoomStore', 'roomStore')
@observer
export class RoomBoardAboutWaitlist extends React.Component {
	waitlistAdd() {
		const userPlaylist = this.props.roomModeWaitlistStore.userPlaylist.slice();

		if (userPlaylist.length == 0) {
			this.props.roomStore.tab = 'waitlistModePlaylist';
		} else {
			waitlistAdd();
		}
	}

	access(actionName) {
    const { userStore, userRoomStore } = this.props;
    
    const current = {
      id: userStore.id,
      roles: uniq([userStore.role, userRoomStore.role])
    }

    return checkAccess(actionName, current);
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

		const playlistCount = this.props.roomModeWaitlistStore.userPlaylist.slice().length;

		// Start Playing (waitlistAdd) - noPlaying
		let actionView = (
			<React.Fragment>
				<Access name="waitlistAdd">
				<Button onClick={() => this.waitlistAdd()}>
					{noPlaying ? 
						<FormattedMessage id="room.waitlist.start"/> : 
						<FormattedMessage id="room.waitlist.join"/>
					}
				</Button>
				</Access>
				<Access name="waitlistAdd" invert>
					<Button
						color={theme.accent1.darken(0.15)}
						onClick={() => {}}>
						<FormattedMessage id="room.waitlist.denyLogin"/>
					</Button>
				</Access>
			</React.Fragment>
		);

		if (currentIsPlaying) {
			actionView = (
				<Button
					color={theme.accent1.darken(0.15)}
					onClick={() => waitlistKick()}>
					<FormattedMessage id="room.waitlist.leave"/>
				</Button>
			);
		}

		if (currentIsWait) {
			actionView = (
				<Button
					color={theme.accent1.darken(0.15)}
					onClick={() => waitlistRemoveUser(currentUserId)}>
					<FormattedMessage id="room.waitlist.leaveQueue"/>
				</Button>
			);

			usersCountView = (
				<React.Fragment>
					<FocusNumber>{currentWaitPosition + 1}</FocusNumber>
					<HideNumber>/ {users.length}</HideNumber>
				</React.Fragment>
			);
		}

		if (roomStore.waitlistLock && !this.access('waitlistLockIgnore')) {
			actionView = (
				<Button
					color={theme.accent1.darken(0.15)}
					onClick={() => {}}>
					<FormattedMessage id="room.waitlist.lock"/>
				</Button>
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
								<FormattedMessage id="room.waitlist.playlistButton"/>
								<PlaylistCount>{humanNumbers(playlistCount)}</PlaylistCount>
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