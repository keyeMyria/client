import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { ButtonGroup, Button, TextField } from 'uikit';
import { User, UserAction } from './User';
import { Access } from 'helpers/access';
import { waitlistClear } from 'mutations/waitlistClear';
import { waitlistMoveUser } from 'mutations/waitlistMoveUser';
import { waitlistRemoveUser } from 'mutations/waitlistRemoveUser';

const Box = styled.div``;

const TopPanel = styled.div`
	padding: 10px 5px;
	display: flex;
	justify-content: flex-end;
`;

const UsersList = styled.div`
	padding: 10px 5px;
`;

const UserBox = styled.div`
	user-select: none;
`;

const UserBoxDD = styled(UserBox)`
  cursor: grab;
`;

const NoUsers = styled.div`
	padding: 30px 0;
	color: ${theme.accent2};
	font-size: 14px;
	text-align: center;
`;

@inject('roomModeWaitlistStore')
@observer
export class WaitlistUsers extends React.Component {
	constructor(props) {
		super(props);
	}

	onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		this.moveUser(result.source.index, result.destination.index);
	};

	removeUser(id) {
		waitlistRemoveUser(id);
	}

	moveUser = (lastPos, newPos) => {
		waitlistMoveUser(lastPos, newPos);
	};

	renderUser(user, i) {
		return (
			<User pos={i} {...user}>
				<Access name="waitlistRemoveUser">
					<UserAction key={'delete'} onClick={() => this.removeUser(user.id)}>
						Delete
					</UserAction>
				</Access>
			</User>
		);
	}

	renderSimpleList() {
		const { users } = this.props.roomModeWaitlistStore;

		return (
			<UsersList>
				{users.length == 0 && <NoUsers>
					<FormattedMessage id="room.waitlist.users.empty" />
				</NoUsers>}
				{users.map((user, i) => <UserBox key={user.id}>{this.renderUser(user, i)}</UserBox>)}
			</UsersList>
		);
	}

	renderDDList() {
		const { users } = this.props.roomModeWaitlistStore;

		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(droppableProvided) => (
						<UsersList innerRef={droppableProvided.innerRef}>
							{users.length == 0 && <NoUsers>
								<FormattedMessage id="room.waitlist.users.empty" />
							</NoUsers>}
							{users.map((user, i) => (
								<Draggable
									key={user.id}
									index={i}
									disableInteractiveElementBlocking={false}
									draggableId={user.id}
								>
									{(draggableProvided) => (
										<React.Fragment>
											<UserBoxDD
												innerRef={draggableProvided.innerRef}
												style={draggableProvided.draggableProps.style}
												{...draggableProvided.draggableProps}
												{...draggableProvided.dragHandleProps}
											>
												{this.renderUser(user, i)}
											</UserBoxDD>
											{draggableProvided.placeholder}
										</React.Fragment>
									)}
								</Draggable>
							))}
							{droppableProvided.placeholder}
						</UsersList>
					)}
				</Droppable>
			</DragDropContext>
		);
	}

	render() {
		return (
			<Box>
				<Access name="waitlistClear">
					<TopPanel>
						<Button onClick={() => waitlistClear()}>
							<FormattedMessage id="room.waitlist.users.clear" />
						</Button>
					</TopPanel>
				</Access>
				<Access name="waitlistMoveUser">
					{this.renderDDList()}
				</Access>
				<Access name="waitlistMoveUser" invert>
					{this.renderSimpleList()}
				</Access>
			</Box>
		);
	}
}