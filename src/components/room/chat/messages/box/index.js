import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';
import { RoomChatMessage } from '../message';

const Box = styled.div`
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

export class MessagesBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.bottomFixed = true;
  }

  componentDidUpdate() {
    if (this.bottomFixed) {
      const { chatscroll } = this.refs;
      

      chatscroll.scrollToBottom();
    }
  }

  chatScroll = (values) => {
    let bottomFixed = values.top >= 0.98;

    if (this.bottomFixed != bottomFixed) {
      this.bottomFixed = bottomFixed;
    }
  }

  render() {
    const { messages } = this.props;

    return (
      <Box>
        <Scrollbars
          ref="chatscroll"
          autoHide={true}
          onScrollFrame={this.chatScroll}>
          <Welcome>Welcome to the chat!</Welcome>
          {this.props.messages.map(message => 
            <RoomChatMessage key={message.id} message={message} />
          )}
        </Scrollbars>
      </Box>
    );
  }
}