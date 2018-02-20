import React from 'react';
import { inject, observer } from 'mobx-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { theme } from 'colors';
import { ButtonGroup, Button, TextField } from 'components/ui';
import { Source } from './Source';
import { addSource, moveSource, removeSource } from 'actions/room/waitlist';

const Box = styled.div``;

const AddSourceBox = styled.div`
	display: flex;
	padding: 0 5px;
`;

const AddSourceTextField = styled.div`flex: 1;`;

const AddSourceSendButton = styled.div`
	align-items: flex-end;
	display: flex;
	margin-left: 20px;
	padding: 5px 0;
`;

const SourcesList = styled.div`padding: 10px 5px;`;

const SourceBox = styled.div`
	user-select: none;
	cursor: grab;
`;

const NoSources = styled.div`
	padding: 30px 0;
	color: ${theme.accent2};
	font-size: 14px;
	text-align: center;
`;

@inject('roomModeWaitlistStore')
@observer
export class WaitlistPlaylist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sourceValue: ''
		};
	}

	onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		moveSource(result.source.index, result.destination.index);
	};

	addSource = () => {
		const link = this.state.sourceValue;
		addSource(link);
	}

	render() {
		const userPlaylist = this.props.roomModeWaitlistStore.userPlaylist.slice();

		return (
			<Box>
				<AddSourceBox>
					<AddSourceTextField>
						<TextField
							autoFocus
							name="waitlistAddSourceValue"
							label="Paste Youtube or Soundcloud Link"
							onBlur={(sourceValue) => this.setState({ sourceValue })}
						/>
					</AddSourceTextField>
					<AddSourceSendButton>
						<Button onClick={this.addSource}>Add</Button>
					</AddSourceSendButton>
				</AddSourceBox>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(droppableProvided) => (
							<SourcesList innerRef={droppableProvided.innerRef}>
								{userPlaylist.length == 0 && <NoSources>You have no sources.</NoSources>}
								{userPlaylist.map((source, i) => (
									<Draggable
										key={source.id}
										index={i}
										disableInteractiveElementBlocking={false}
										draggableId={source.id}
									>
										{(draggableProvided) => (
											<React.Fragment>
												<SourceBox
													innerRef={draggableProvided.innerRef}
													style={draggableProvided.draggableProps.style}
													{...draggableProvided.draggableProps}
													{...draggableProvided.dragHandleProps}
												>
													<Source
														pos={i}
														{...source}
														actions={[
															{
																title: 'Delete',
																onClick: () => removeSource(source.id)
															}
														]}
													/>
												</SourceBox>
												{draggableProvided.placeholder}
											</React.Fragment>
										)}
									</Draggable>
								))}
								{droppableProvided.placeholder}
							</SourcesList>
						)}
					</Droppable>
				</DragDropContext>
			</Box>
		);
	}
}