import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from 'uikit';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'utils/intl';
import { createRoom } from 'mutations/createRoom';

const CreateRoomModal = styled.div`
  width: 400px;
`;

const FormBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;

@injectIntl()
export class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: ""
    };
  }

  create() {
    const { name, title } = this.state;
    createRoom({ name, title });
  }

  render() {
    const { formatMessage } = this.props.intl;
    
    return (
      <CreateRoomModal>
        <TextField
          autoFocus
          name="roomTitle"
          label={formatMessage({ id: "main.createRoom.title" })}
          onBlur={title => this.setState({ title })}
          />
        <TextField
          name="roomName"
          before="rave.pro/"
          label={formatMessage({ id: "main.createRoom.url" })}
          placeholder="roomname"
          onBlur={name => this.setState({ name })}
          />
        <FormBottom>
          <Button onClick={() => this.create()}>
            <FormattedMessage id="main.createRoom.create" />
          </Button>
        </FormBottom>
      </CreateRoomModal>
    );
  }
}