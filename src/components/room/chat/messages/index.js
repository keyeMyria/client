import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';
import { RoomChatMessage } from './message';
import { SendMessageForm } from './form';

const Box = styled.div`
  height: 100%;
`;

const MessagesBox = styled.div`
  position: relative;
  height: calc(100% - 104px);
  overflow-y: hidden;
`;

const Welcome = styled.div`
  text-align: center;
  font-size: 13px;
  padding: 14px 10px;
  color: ${theme.accent2};
`;

@inject('roomChatStore')
@observer
export class ChatMessages extends React.Component {
  constructor(props) {
    super(props);

    this.bottomFixed = true;
  }

  chatScroll = (values) => {
    let bottomFixed = values.top >= 0.95;

    if (this.bottomFixed != bottomFixed) {
      this.bottomFixed = bottomFixed;
    }
  }

  chatScrollUpdate = (values) => {
    if (this.bottomFixed) {
      const { chatscroll } = this.refs;
      
      setTimeout(() => chatscroll.scrollToBottom(), 0);
    }
  }

  render() {
    return (
      <Box>
        <MessagesBox>
          <Scrollbars
            ref="chatscroll"
            autoHide={true}
            onUpdate={this.chatScrollUpdate}
            onScrollFrame={this.chatScroll}>
            <Welcome>Welcome to the chat!</Welcome>
            {this.props.roomChatStore.messages.map(message => 
              <RoomChatMessage key={message.id} message={message} />
            )}
          </Scrollbars>
        </MessagesBox>
        <SendMessageForm />
      </Box>
    );
  }
}