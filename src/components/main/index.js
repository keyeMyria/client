import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { inject, observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { Access } from 'helpers/access';

import { Button, ButtonwGroup, Modal } from 'uikit';

import { CreateRoom } from './createRoom';
import { MainRoom } from './room';

const MainBox = styled.div`
  background: ${theme.dark1};
  height: 100%;
  overflow-y: auto;
`;

const MainTopNav = styled.div`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid ${theme.dark1};
  position: relative;
  z-index: 1000;
`;

const Rooms = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 20px;
`;

const RoomsBox = styled.div`
  
`;

const RoomBox = styled.div`
  width: 100%;
`;

const RoomsHeader = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  margin-bottom: 10px;
`;

const RoomsTitleBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomsTitle = styled.div`
  font-size: 18px;
`;

const RoomsDescription = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: ${theme.accent2};
`;

const RoomsCreate = styled.div`
  margin-left: auto;
`;

const NoRooms = styled.div`
  color: ${theme.accent2};
  font-size: 15px;
  padding: 10px;
  text-align: center;
`;

const Loading = styled.div`
  color: ${theme.accent2};
  font-size: 15px;
  padding: 10px;
  text-align: center;
`;

const LoadingError = styled.div`
  color: ${theme.accent2};
  font-size: 15px;
  padding: 10px;
  text-align: center;
`;

@inject('mainStore')
@observer
export class Main extends React.Component {

  openCreateRoom() {
    this.props.mainStore.modal = 'createRoom';
  }

  getNoRooms() {
    return (
      <NoRooms>
        <FormattedMessage id="main.rooms.notfound" />
      </NoRooms>
    );
  }

  getRooms() {
    const { rooms } = this.props.mainStore;

    if (rooms.length === 0) {
      return this.getNoRooms();
    }

    return (
      <RoomsBox>
        {rooms.map(room => 
          <RoomBox key={room.id}>
            <MainRoom {...room} />
          </RoomBox>
        )}
      </RoomsBox>
    );
  }

  getError() {
    return (
      <LoadingError>
        <FormattedMessage id="main.rooms.loadingerror" />
      </LoadingError>
    );
  }

  getLoading() {
    return (
      <Loading>
        <FormattedMessage id="main.rooms.loading" />
      </Loading>
    );
  }

  getContent() {
    switch (this.props.mainStore.status) {
      case 'loading':
        return this.getLoading();
      case 'ready':
        return this.getRooms();
      case 'error':
        return this.getError();
      default:
        return null;
    }
  }
    
  render() {
    return (
      <MainBox>
        <Rooms>
          <RoomsHeader>
            <RoomsTitleBox>
              <RoomsTitle>
                <FormattedMessage id="main.rooms.title" />
              </RoomsTitle>
              {/* <RoomsDescription>
                <FormattedMessage
                  id="main.rooms.description"
                  defaultMessage="Most Popular Rooms" />
              </RoomsDescription> */}
            </RoomsTitleBox>
            <Access name="createRoom">
              <RoomsCreate>
                <Button
                  onClick={() => this.openCreateRoom()}>
                  <FormattedMessage id="main.rooms.create" />
                </Button>
              </RoomsCreate>
            </Access>
          </RoomsHeader>
          {this.getContent()}
        </Rooms>
        
        <Access name="createRoom">
          <Modal
            title={<FormattedMessage id="main.rooms.create" />}
            isOpen={this.props.mainStore.modal === 'createRoom'}
            onClose={() => this.props.mainStore.modal = ''}>
            <CreateRoom />
          </Modal>
        </Access>
      </MainBox>
    );
  }
}