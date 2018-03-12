import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import Access from 'components/ui/access';
import { removeRoomMessage } from 'mutations/removeRoomMessage';
import { roomProfileStore } from 'stores';

const Box = styled.div`
  font-size: 12.5px;
  position: relative;
  overflow: hidden;

  :first-child {
    padding-top: 8px;
  }

  :last-child {
    padding-bottom: 8px;
  }
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 26px;
  border-radius: 100%;
  /* background: ${theme.dark2}; */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  z-index: 20;
`;

const AvatarImg = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background: ${theme.dark2};
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 22px;
  padding-top: 10px;
`;

const Username = styled.div`
  font-weight: 500;
  color: ${theme.accent2.lighten(0.4)};
  flex: 1;
`;

const Date = styled.div`
  margin-left: auto;
  color: ${theme.accent2};
  font-size: 12px;
  text-align: right;
  padding: 0 16px;
`;

const Content = styled.div`
  position: relative;

  :hover {
    background: linear-gradient(-90deg, ${theme.dark1.lighten(0.2)}, ${theme.dark1});
  }
`;

const Text = styled.div`
  color: ${theme.accent2};
  padding: 4px 10px 4px 50px;
  overflow: hidden;
  overflow-wrap: break-word;
`;

const ManageMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  height: 22px;
  padding: 0 10px;
  margin-right: 4px;
  align-items: center;
  justify-content: flex-end;
  background: ${theme.dark1.lighten(0.2)};
  cursor: pointer;

  ${Content}:hover & {
    display: flex;
  }
`;

const ManageItem = styled.div`
  padding: 0 3px;
  color: ${theme.accent2};

  i {
    font-size: 17px;
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
  openProfile = () => {
    roomProfileStore.setAndOpen(this.props.user);
  }

  deleteMessage = () => {
    removeRoomMessage(this.props.id);
  }

  render() {
    const {
      id,
      user,
      text,
      date,
      compact
    } = this.props;
    
    return (
      <Box>
        {!compact && <Header>
          <Avatar onClick={this.openProfile}>
            {user.site.avatar && <AvatarImg src={user.site.avatar} />}
          </Avatar>
          <Username>{user.site.name}</Username>
          <Date>{date}</Date>
        </Header>}
        <Content>
          <Text>{text}</Text>
          <Access name="manageMessage">
            <ManageMenu>
              <Access name="removeMessage" context={user}>
                <ManageItem onClick={this.deleteMessage}>
                  <i className="zmdi zmdi-close"></i>
                </ManageItem>
              </Access>
            </ManageMenu>
          </Access>
        </Content>
      </Box>
    );
  }
}