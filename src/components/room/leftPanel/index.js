import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';

import { LeftPanelRoom } from './Room';
import { LeftPanelFriend } from './Freind';

const Box = styled.div`
  height: 100%;
`;

const Section = styled.div`
  padding: 10px 0;
  margin-bottom: 20px;
  min-height: calc(30px + 44px * 5 + 20px);
`;
const Title = styled.div`
  font-size: 12px;
  padding: 5px 14px 10px;
  text-transform: uppercase;
  font-weight: 500;
  color: ${theme.accent2};
`;

const Content = styled.div`

`;

const Empty = styled.div`
  padding: 14px 0;
  font-size: 12px;
  color: ${theme.accent2.darken(0.1)};
  text-align: center;
`;

const rooms = [
  {
    id: 1,
    avatar: "https://ravepro.ams3.digitaloceanspaces.com/logo.jpg",
    name: 'ravecat',
    title: "RaveCat",
    content: <FormattedMessage id="leftPanel.following.room.none" />,
    online: 0
  }
];

export const LeftPanel = () => (
  <Box>
    <Scrollbars autoHide>
      <Section>
        <Title>
          <FormattedMessage id="leftPanel.following.title"/>
        </Title>
        <Content>
          {rooms.length === 0 &&
          <Empty>
            <FormattedMessage id="leftPanel.following.none"/>
          </Empty>}
          {rooms.map(room => 
            <LeftPanelRoom key={room.id} {...room} />
          )}
        </Content>
      </Section>
      {/* <Section>
        <Title>Friends Online</Title>
        <Content>
          {friends.length === 0 && <Empty>You have no friends online.</Empty>}
          {friends.map(friend => 
            <LeftPanelFriend key={friend.id} {...friend} />
          )}
        </Content>
      </Section> */}
    </Scrollbars>
  </Box>
);