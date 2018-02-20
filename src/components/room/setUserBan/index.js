import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { TextField, Button } from 'components/ui';
import { ban as banUserRoom } from 'actions/room/user/ban';

const Box = styled.div`
  width: 400px;
`;

const AboutUser = styled.div`
  font-size: 14px;
  color: ${theme.accent2};
`;

const Username = styled.span`
  color: ${theme.text1};
  padding: 0 5px;
`;

const RoomTitle = styled.span`
  color: ${theme.text1};
  padding: 0 5px;
`;

const BanFrom = styled.div``;

const Date = styled.div``;

const Reason = styled.div``;

const Bottom = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

@inject('roomSetBanFormStore', 'roomStore')
@observer
export class RoomSetBan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: ''
    };
  }

  setBan() {
    const { roomSetBanFormStore } = this.props;
    const userId = roomSetBanFormStore.user.site.id
    const { reason } = this.state;

    banUserRoom(userId, reason).then(() => {
      roomSetBanFormStore.close();
    });
  }

  setReason(value) {
    this.setState({ reason: value });
  }

  render() {
    const { roomSetBanFormStore, roomStore } = this.props;
    const { user } = roomSetBanFormStore;

    if (!user) {
      return null;
    }

    return (
      <Box>
        <AboutUser>
          Set Ban
          <Username>{user.site.name}</Username>
          in
          <RoomTitle>{roomStore.title}</RoomTitle>
        </AboutUser>
        <BanFrom>
          <Date></Date>
          <Reason>
            <TextField label="Reason" onChanged={v => this.setReason(v)} />
          </Reason>
            <Bottom>
              <Button onClick={() => this.setBan()}>Ban</Button>
            </Bottom>
        </BanFrom>
      </Box>
    );
  }
}