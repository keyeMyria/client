import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import Access from 'components/ui/access';
import { removeRoomMessage } from 'mutations/removeRoomMessage';
import { roomProfileStore } from 'stores';

const Box = styled.div`
  display: flex;
  padding: 6px 0;
  font-size: 12.5px;
  position: relative;
  overflow: hidden;

  :first-child {
    padding-top: 8px;
  }
`;

const Left = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
`;

const Avatar = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background: ${theme.dark2};
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background: ${theme.dark2};
`;

const Right = styled.div`
  width: calc(100% - 60px);
`;

const Header = styled.div`
  display: flex;
  width: 100%;
`;

const Username = styled.div`
  color: ${theme.text1};
  width: calc(100% - 40px);
`;

const Date = styled.div`
  margin-left: auto;
  width: 40px;
  color: ${theme.accent2};
  font-size: 12px;
  text-align: right;
`;

const Text = styled.div`
  color: ${theme.accent2};
  padding: 5px 10px 5px 0;
  overflow: hidden;
  overflow-wrap: break-word;
`;

const ManageMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  min-width: 45px;
  height: 42px;
  padding: 0 10px;
  align-items: center;
  justify-content: flex-end;
  background: ${theme.dark1};
  cursor: pointer;

  ${Box}:hover & {
    display: flex;
  }
`;

const ManageItem = styled.div`
  padding: 0 10px;
  color: ${theme.accent2};

  i {
    font-size: 18px;
    color: ${theme.accent2};
  }

  :hover {
    color: ${theme.text1};

    i {
      color: ${theme.text1};
    }
  }
`;

export class RoomChatMessage extends React.PureComponent {
  openProfile() {
    roomProfileStore.setAndOpen(this.props.message.user);
  }

  replyMessage = () => {
    // const { name } = this.props;
    // this.context.reply({ name, tag: 1337 });
  }

  deleteMessage = () => {
    const { id } = this.props.message;
    removeRoomMessage(id);
  }

  render() {
    const {
      id,
      user,
      text,
      date,
    } = this.props.message;

    return (
      <Box>
        <Left>
          <Avatar onClick={() => this.openProfile()}>
            {user.site.avatar && <AvatarImg src={user.site.avatar} />}
          </Avatar>
        </Left>
        <Right>
          <Header>
            <Username>{user.site.name}</Username>
            <Date>{date}</Date>
          </Header>
          <div>
            <Text>{text}</Text>
          </div>
        </Right>
        <Access name="manageMessage">
          <ManageMenu>
            {/* <Access name="replyMessage">
              <ManageItem onClick={() => this.replyMessage()}>
                <i className="zmdi zmdi-mail-reply"></i>
              </ManageItem>
            </Access> */}
            <Access name="removeMessage" context={user}>
              <ManageItem onClick={this.deleteMessage}>
                <i className="zmdi zmdi-close"></i>
              </ManageItem>
            </Access>
          </ManageMenu>
        </Access>
      </Box>
    );
  }
}