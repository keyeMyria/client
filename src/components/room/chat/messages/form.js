import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Line } from 'rc-progress';
import { uniq } from 'ramda';
import { checkAccess } from 'utils/access';
import { Access } from 'components/ui/access';
import { RoomChatSettings } from './settings';
import { createRoomMessage } from 'mutations/createRoomMessage';
import { roomChatStore } from 'stores';

const Box = styled.div`
  height: 60px;
  border-top: 1px solid ${theme.dark2};
  display: flex;
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
  margin: 0 10px 0 15px;
  position: relative;

  input {
    width: calc(100% - 20px);
    padding: 0 30px 0 10px;
    height: 36px;
    color: ${theme.text1};
    background: ${theme.dark2};
    border: none;
    border-radius: 4px;
    font-size: 12px;
    outline: none;
    margin: auto;
  }
`;

const Emoji = styled.div`
  position: absolute;
    right: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    color: ${theme.accent2};
    cursor: pointer;

    :hover {
      color: ${theme.text1};
    }
`;

const SlowModeProgress = styled.div`
  height: 1px;
  position: absolute;
  top: -14px;
  left: 0;
  width: 100%;
`;

const ChatSendBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: ${theme.dark1};
  color: ${theme.accent2};
  font-size: 13px;
`;

@inject('userStore', 'userRoomStore', 'roomStore')
@observer
export class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onSelectEmoji = this.onSelectEmoji.bind(this);

    this.state = {
      slowMode: false,
      slowModeDealy: 2,
      slowModeProgress: 100
    };
  }
  
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  runSlowModeProgress() {
    const delay = this.state.slowModeDealy * 1000;
    const startTime = +new Date();
    const endTime = startTime + delay;

    const prgIntvl = setInterval(() => {
      const currentTime = +new Date();

      if (currentTime > endTime) {
        clearInterval(prgIntvl);
      }

      const value = 100 - ((currentTime - startTime) * 100 / delay);
      
      this.setState({ slowModeProgress: value });
    }, 10);
  }

  showSlowMode() {
    const { slowModeDealy } = this.state;

    this.setState({ slowMode: true });
    this.runSlowModeProgress();

    setTimeout(() => {
      this.hideSlowMode();
    }, slowModeDealy * 1000);
  }

  hideSlowMode() {
    this.setState({ slowMode: false });
  }

  onSelectEmoji(emojiName) {
    const { textInput } = this;
    const currentValue = textInput.value.length ? `${textInput.value} ` : '';
    textInput.value = `${currentValue}${emojiName} `;
    textInput.selectionStart = textInput.value.length;
  }

  access(actionName) {
    const { userStore, userRoomStore } = this.props;
    
    const current = {
      id: userStore.id,
      roles: uniq([userStore.role, userRoomStore.role])
    }

    return checkAccess(actionName, current);
  }
  
  sendMessage(message) {
    message = message ? message : this.textInput.value.trim();
    if (message.length == 0) return;

    if (this.state.slowMode) return;
    
    createRoomMessage(message).then(() => {
      this.textInput.value = "";
      roomChatStore.toBottom();
    
      if (this.props.roomStore.slowMode && !this.access('sendMessageSlowModeIgnore')) {
        this.showSlowMode();
      }
    });
  }

  render() {
    return (
      <Box>
        {this.state.slowMode && <SlowModeProgress>
          <Line
            percent={this.state.slowModeProgress}
            strokeWidth="0.5"
            trailWidth="1"
            trailColor={null}
            strokeColor="#8a919d" />
        </SlowModeProgress>}
        <Access name="chatMenu">
          <RoomChatSettings />
        </Access>
        <Right>
          <Access name="sendMessage">
            {this.props.roomStore.followerMode && <Access
              name="sendMessageFollowerModeIgnore" invert>
              <ChatSendBlock>
                You must be a follower for more than 30 minutes to typing messages.
              </ChatSendBlock>
            </Access>}
            <input
              autoFocus
              onKeyPress={this.handleKeyPress}
              placeholder="Message.."
              ref={(input) => { this.textInput = input; }} />
          </Access>
          <Access name="sendMessage" invert>
            <ChatSendBlock>
              Login to typing message.
            </ChatSendBlock>
          </Access>
        </Right>
      </Box>
    );
  }
}
