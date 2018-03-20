import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';
import { RoomSource, Action } from './RoomSource';
import { injectIntl } from 'utils/intl';
import { collectionRemoveSource } from 'mutations/collectionRemoveSource';
import { ButtonGroup, Button, TextField, Switch } from 'uikit';
import { Modal } from 'uikit/modal';
import { Access } from 'helpers/access';

import { RoomAddSource } from './RoomAddSource';

const Box = styled.div``;

const TopPanel = styled.div`
  display: flex;
	padding: 0 5px;
`;

const SearchBox = styled.div`
  flex: 1;
`;

const AddSourceButton = styled.div`
  align-items: flex-end;
	display: flex;
	margin-left: 20px;
	padding: 5px 0;
`;

const NoSources = styled.div`
  padding: 30px 0;
	line-height: 25px;
	color: ${theme.accent2};
	font-size: 13px;
	text-align: center;
`;

const Sources = styled.div`
  padding: 10px 5px;
`;

@injectIntl()
@inject('roomCollectionStore')
@observer
export class RoomCollection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addSourceModalIsOpen: false,
      searchValue: ""
    };
  }

  search = (searchValue = this.state.searchValue) => {
		this.setState({ searchValue });
		// waitlistAddSource(link, this.state.useTimecode);
	}

  render() {
    const { formatMessage } = this.props.intl;
    const roomSources = this.props.roomCollectionStore.sources.slice();

    return (
      <Box>
        <Access name="collectionAddSource">
          <TopPanel>
            <SearchBox>
              <TextField
                autoFocus
                selectAllOnFocus
                name="collectionSearchValue"
                label={formatMessage({
                  id: "room.collection.searchInput"
                })}
                onBlur={(searchValue) => this.setState({ searchValue })}
                onPressEnter={(searchValue) => this.search(searchValue)}
              />
            </SearchBox>
            <Access name="collectionAddSource">
              <AddSourceButton>
                <Button onClick={() => this.setState({ addSourceModalIsOpen: true })}>
                  <FormattedMessage id="room.collection.addSourceButton"/>
                </Button>
              </AddSourceButton>
            </Access>
          </TopPanel>
        </Access>
        <Sources>
          {roomSources.length === 0 && <NoSources>
            <FormattedMessage id="room.collection.empty"/>
          </NoSources>}
          {roomSources.map(({ id, source }, i) => (
            <RoomSource key={id} {...source}>
              <Access name="collectionRemoveSource">
                <Action onClick={() => collectionRemoveSource(id)}>Delete</Action>
              </Access>
            </RoomSource>
          ))}
        </Sources>
        <Modal
          isOpen={this.state.addSourceModalIsOpen}
          onClose={() => this.setState({ addSourceModalIsOpen: false })}
          title="Add Source">
          <RoomAddSource />
        </Modal>
      </Box>
    );
  }
}