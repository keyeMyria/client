import React from 'react';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { theme } from 'colors';
import { ButtonGroup, Button, TextField, Switch } from 'uikit';
import { Source } from './Source';
import { injectIntl } from 'utils/intl';
import { waitlistAddSource } from 'mutations/waitlistAddSource';
import { waitlistMoveSource } from 'mutations/waitlistMoveSource';
import { waitlistRemoveSource } from 'mutations/waitlistRemoveSource';

const Box = styled.div``;

const AddSourceBox = styled.div`
	display: flex;
	padding: 0 5px;
`;

const AddSourceTextField = styled.div`
	flex: 1;
`;

const AddSourceSendButton = styled.div`
	align-items: flex-end;
	display: flex;
	margin-left: 20px;
	padding: 5px 0;
`;

const SourcesList = styled.div`
	padding: 10px 5px;
`;

const SourceBox = styled.div`
	user-select: none;
	cursor: grab;
`;

const NoSources = styled.div`
	padding: 30px 0;
	line-height: 25px;
	color: ${theme.accent2};
	font-size: 13px;
	text-align: center;
`;

const Options = styled.div`
	padding: 10px 0;
`;

const UseTimeCode = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
`;

const UseTimeCodeTitle = styled.div`
	font-size: 13px;
	color: ${theme.accent2};
	padding: 0 10px;
`;

@injectIntl()
@inject('roomModeWaitlistStore')
@observer
export class WaitlistPlaylist extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sourceValue: '',
			useTimecode: false
		};
	}

	onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		waitlistMoveSource(result.source.index, result.destination.index);
	};

	addSource = (link = this.state.sourceValue) => {
		this.setState({ sourceValue: link });
		waitlistAddSource(link, this.state.useTimecode);
	}

	changeUseTimecode = () => {
		this.setState({ useTimecode: !this.state.useTimecode });
	}

	render() {
		const { formatMessage } = this.props.intl;
		const userPlaylist = this.props.roomModeWaitlistStore.userPlaylist.slice();

		return (
			<Box>
				<AddSourceBox>
					<AddSourceTextField>
						<TextField
							autoFocus
							selectAllOnFocus
							name="waitlistAddSourceValue"
							label={formatMessage({
								id: "room.waitlist.playlist.addInputPlaceholder"
							})}
							onBlur={(sourceValue) => this.setState({ sourceValue })}
							onPressEnter={(sourceValue) => this.addSource(sourceValue)}
						/>
					</AddSourceTextField>
					<AddSourceSendButton>
						<Button onClick={this.addSource}>
							<FormattedMessage id="room.waitlist.playlist.addButton"/>
						</Button>
					</AddSourceSendButton>
				</AddSourceBox>
				<Options>
					<UseTimeCode>
						<Switch
							checked={this.state.useTimecode}
							onChange={this.changeUseTimecode} />
						<UseTimeCodeTitle>
							<FormattedMessage id="room.waitlist.playlist.useTimecode" />
						</UseTimeCodeTitle>
					</UseTimeCode>
				</Options>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(droppableProvided) => (
							<SourcesList innerRef={droppableProvided.innerRef}>
								{userPlaylist.length == 0 && <NoSources>
									<FormattedMessage id="room.waitlist.playlist.noSources" />
								</NoSources>}
								{userPlaylist.map(({ source }, i) => (
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
																onClick: () => waitlistRemoveSource(source.id)
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