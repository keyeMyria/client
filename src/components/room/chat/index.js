import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { shortNumbers, humanNumbers } from 'utils';

import { NavTabs, NavTab, NavTabsContent, NavTabContent } from 'uikit';

import { ChatMessages } from './messages';
import { RoomUsersContainer } from 'containers/room/chat/users';

const Box = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

const Tabs = styled(NavTabs)`
  display: flex;
  height: 44px;
  border-bottom: 1px solid ${theme.dark2};
`;

const Tab = styled(NavTab)`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  color: ${({ isActive }) => isActive ? theme.text1 : theme.accent2};
  align-items: center;
  justify-content: center;
`;

const TabBox = styled.div`
  display: flex;
  font-size: 14px;
`;

const ConnectionsCount = styled.div`
  display: flex;
  align-content: center;
  font-size: 12px;
  margin-left: 8px;
  height: 100%;
  min-width: 30px;
  justify-content: center;
`;

const TabsContent = styled(NavTabsContent)`
  height: 100%;
  overflow: hidden;
`;
const TabContent = styled(NavTabContent)`
  height: 100%;
  overflow: hidden;
`;

@inject('roomStore')
@observer
export class Chat extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      tabActive: 'messages'
    };
  }

  setActiveTab(name) {
    this.setState({tabActive: name});
  }

  render() {
    const { roomStore } = this.props;
    const { connectionsCount } = roomStore;

    return (
      <Box>        
        <Tabs
          active={this.state.tabActive}
          onSelect={tabName => this.setActiveTab(tabName)}>
          <Tab name="messages" isActive={this.state.tabActive == "messages"}>
            <TabBox>
              <i className="zmdi zmdi-comments"></i>
            </TabBox>
          </Tab>
          <Tab name="users" isActive={this.state.tabActive == "users"}>
            <TabBox>
              <i className="zmdi zmdi-accounts"></i>
              <ConnectionsCount title={humanNumbers(connectionsCount)}>
                {humanNumbers(connectionsCount)}
              </ConnectionsCount>
            </TabBox>
          </Tab>
        </Tabs>
        <TabsContent active={this.state.tabActive}>
          <TabContent name="messages">
            <ChatMessages />
          </TabContent>
          <TabContent name="users">
            <RoomUsersContainer />
          </TabContent>
        </TabsContent>
      </Box>
    );
  }
}