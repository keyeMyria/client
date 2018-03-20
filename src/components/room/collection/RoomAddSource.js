import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { FormattedMessage } from 'react-intl';
import { ButtonGroup, Button, TextField, Switch } from 'uikit';
import { injectIntl } from 'utils/intl';
import { collectionAddSource } from 'mutations/collectionAddSource';

const Box = styled.div`
  width: 500px;
`;

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

@injectIntl()
export class RoomAddSource extends React.Component {
  constructor(props) {
    super(props);
  }

  addSource = (link = this.state.sourceValue) => {
    this.setState({ sourceValue: link });
		collectionAddSource(link);
	}

  render() {
    const { formatMessage } = this.props.intl;

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
      </Box>
    );
  }
}