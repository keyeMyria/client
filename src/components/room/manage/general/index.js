import React from 'react';
import { inject, observer } from 'mobx-react';
import { router } from 'utils/router';
import styled from 'styled-components';
import { theme } from 'colors';

import Access from 'components/ui/access';
import { TextField, Button } from 'components/ui';

import { setTitle } from 'actions/room/setTitle';
import { ban } from 'actions/room/ban';
import { remove } from 'actions/room/remove';

const Box = styled.div`
  
`;

const Title = styled.div`
  font-size: 20px;
  color: ${theme.text1};
  padding-bottom: 10px;
`;

const MainForm = styled.div`
  display: flex;
`;

const Left = styled.div`
  width: 160px;
  display: flex;
  margin: 10px 30px 10px 0;
  justify-content: center;
}
`;

const Right = styled.div`
  width: calc(100% - 160px);
`;

const Cover = styled.div`
  background: ${theme.accent1};
  height: 120px;
  width: 120px;
  border: 2px solid ${theme.accent1};
  border-radius: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

const RemoveRoom = styled.div`
  margin: 14px 0;
  display: inline-flex;
`;

const BanRoom = styled.div`
  margin: 14px 0;
  margin-right: 8px;
  display: inline-flex;
`;

@inject('roomStore')
@observer
export class RoomManageGeneral extends React.Component {
  removeRoom = () => {
    remove().then(() => {
      this.props.roomStore.tab = '';
      router.navigate('/');
    });
  }

  banRoom = () => {
    ban().then(() => {
      this.props.roomStore.tab = '';
      router.navigate('/');
    });
  }

  render() {
    const { roomStore } = this.props;

  	return (
  		<Box>
        <MainForm>
          <Left>
            <Cover>
              <img src={roomStore.avatar} />
            </Cover>
          </Left>
          <Right>
            <TextField
              name="roomTitle"
              label="Title"
              onBlur={setTitle}
              value={roomStore.title} />
            <Access name="banRoom">
              <BanRoom>
                <Button
                  type="danger"
                  onClick={this.banRoom}>Ban</Button>
              </BanRoom>
            </Access>
            <Access name="removeRoom">
              <RemoveRoom>
                <Button
                  type="danger"
                  onClick={this.removeRoom}>Remove</Button>
              </RemoveRoom>
            </Access>
          </Right>
        </MainForm>
  		</Box>
  	);
  }
}