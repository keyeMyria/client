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

const ToBottom = styled.div`
  background: ${theme.dark2};
  font-size: 13px;
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  cursor: pointer;
  position: absolute;
  bottom: 0;
`;

export class MessagesBox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.bottomFixed = true;
    
    this.state = {
      bottomFixed: true
    }
  }

  componentDidMount() {
    this.toBottom();
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
      this.setState({ bottomFixed });
    }
  }

  toBottom = () => {
    this.bottomFixed = true;
    this.setState({ bottomFixed: true });
    const { chatscroll } = this.refs;
    chatscroll.scrollToBottom();
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
        {!this.state.bottomFixed &&
          <ToBottom onClick={this.toBottom}>To New Messages</ToBottom>
        }
      </Box>
    );
  }
}