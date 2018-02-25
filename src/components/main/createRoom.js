import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from 'components/ui';
import { createRoom } from 'mutations/createRoom';

const CreateRoomModal = styled.div`
  width: 400px;
`;

const FormBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;

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
    return (
      <CreateRoomModal>
        <TextField
          autoFocus
          name="roomTitle"
          label="Title"
          onBlur={title => this.setState({ title })}
          />
        <TextField
          name="roomName"
          before="rave.pro/"
          label="URL"
          placeholder="roomname"
          onBlur={name => this.setState({ name })}
          />
        <FormBottom>
          <Button 
            onClick={() => this.create()}
            className="CreateRoom__CreateButton">Create</Button>
        </FormBottom>
      </CreateRoomModal>
    );
  }
}