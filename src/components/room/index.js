import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';

import { injectIntl } from 'utils/intl';
import { Modal } from 'uikit';
import { Access } from 'helpers/access';
import { RoomModal } from './modal';

import TopNav from 'components/topNav';
import { RoomTopNav } from './topNav';
import { RoomBoard } from './board';
import { RoomChatContainer } from 'containers/room/chat';
import { RoomProfile } from './profile';
import { RoomSetBan } from './setUserBan';
import { RoomSetRole } from './setUserRole';
import { RoomCollectionContainer } from 'containers/room/collection';
import RoomManage from './manage';
import { LeftPanel } from './leftPanel';
import { WaitlistPlaylist } from './board/waitlist/playlist';
import { WaitlistUsers } from './board/waitlist/users';

const Box = styled.div`
	height: 100%;
	overflow: hidden;
	background: ${theme.dark2};
`;

const Top = styled.div`
	height: 50px;
	width: 100%;
	border-bottom: 1px solid ${theme.dark1};
	position: relative;
	z-index: 1000;
`;

const Content = styled.div`
	height: calc(100% - 50px);
	display: flex;
`;

const Left = styled.div`
	height: 100%;
	width: 240px;
	overflow: hidden;
	background: ${theme.dark1};
`;

const Middle = styled.div`
	height: 100%;
	flex: 1;
	overflow: hidden;
	position: relative;
`;

const HeaderBox = styled.div`
	height: 50px;
	padding: 8px 20px;
`;

const Header = styled.div`height: 100%;`;

const Board = styled.div`
	height: calc(100% - 32px - 50px);
	padding: 0 20px;
`;

const Right = styled.div`
	height: 100%;
	width: 340px;
	background: ${theme.dark1};
`;

const Chat = styled.div`
	height: 100%;
	overflow: hidden;
`;

@injectIntl()
@inject(
	'roomProfileStore',
	'roomSetBanFormStore',
	'roomSetRoleFormStore'
)
@observer
export class Room extends React.Component {
	render() {
		const { formatMessage } = this.props.intl;
		const {
			roomProfileStore,
			roomSetBanFormStore,
			roomSetRoleFormStore
		} = this.props;

		return (
			<Box>
				<Top>
					<TopNav />
				</Top>
				<Content>
					<Left>
						<LeftPanel />
					</Left>
					<Middle>
							<RoomModal
								name="collection"
								title={formatMessage({
									id: "room.modal.collection"
								})}>
							<RoomCollectionContainer />
						</RoomModal>
						<Access name="manageRoom">
							<RoomModal
								name="manage"
								title={formatMessage({
									id: "room.modal.manage"
								})}>
								<RoomManage />
							</RoomModal>
						</Access>
						<RoomModal
							name="waitlistModePlaylist"
							title={formatMessage({
								id: "room.modal.waitlistPlaylist"
							})}>
							<WaitlistPlaylist />
						</RoomModal>
						<RoomModal
							name="waitlistModeUsers"
							title={formatMessage({
								id: "room.modal.waitlistUsers"
							})}>
							<WaitlistUsers />
						</RoomModal>
						<HeaderBox>
							<Header>
								<RoomTopNav />
							</Header>
						</HeaderBox>
						<Scrollbars>
							<Board>
								<RoomBoard />
							</Board>
						</Scrollbars>
					</Middle>
					<Right>
						<Chat>
							<RoomChatContainer />
						</Chat>
					</Right>
				</Content>
				<Modal
					isOpen={roomProfileStore.open}
					onClose={() => { roomProfileStore.open = false }}
					title={formatMessage({
						id: "room.modal.profile"
					})}>
					<RoomProfile />
				</Modal>
				<Modal
					isOpen={roomSetBanFormStore.open}
					onClose={() => { roomSetBanFormStore.open = false }}
					title={formatMessage({
						id: "room.modal.setBan"
					})}>
					<RoomSetBan />
				</Modal>
				<Modal
					isOpen={roomSetRoleFormStore.open}
					onClose={() => { roomSetRoleFormStore.open = false }}
				 	title={formatMessage({
						id: "room.modal.setRole"
					})}>
					<RoomSetRole />
				</Modal>
			</Box>
		);
	}
}