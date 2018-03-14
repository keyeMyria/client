import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { ButtonGroup, Button, TextField } from 'uikit';
import { User, UserAction } from './User';
import { Access } from 'helpers/access';

const Box = styled.div``;

const UsersList = styled.div`padding: 10px 5px;`;

const UserBox = styled.div`user-select: none;`;

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
		this.props.roomModeWaitlistStore.removeUser(id);
	}

	moveUser = (lastPos, newPos) => {
		this.props.roomModeWaitlistStore.moveUser(lastPos, newPos);
	};

	renderUser(user, i) {
		return (
			<User pos={i} {...user}>
				<Access name="waitlistRemoveUser">
					<UserAction key={i} onClick={() => this.removeUser(user.id)}>
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
				{users.length == 0 && <NoUsers>Waitlist is empty.</NoUsers>}
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
							{users.length == 0 && <NoUsers>Waitlist is empty.</NoUsers>}
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