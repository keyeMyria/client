import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { MessagesBox } from './box';
import { SendMessageForm } from './form';

const Box = styled.div`
  height: 100%;
`;

@inject('roomChatStore')
@observer
export class ChatMessages extends React.Component {
  render() {
    return (
      <Box>
        <MessagesBox messages={this.props.roomChatStore.messagesList} />
        <SendMessageForm />
      </Box>
    );
  }
}