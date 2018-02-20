import React from 'react';
import styled from 'styled-components';
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
  // {
  //   id: 1,
  //   avatar: "https://pp.userapi.com/c626221/v626221510/7026b/zKYk5tlr530.jpg",
  //   title: "RaveCat",
  //   content: "The Upbeats - Punks",
  //   online: 60
  // },
  // {
  //   id: 2,
  //   avatar: "https://img00.deviantart.net/b090/i/2015/121/1/0/esp_guitar_logo_design_2_by_fangschrecke-d2ukiki.jpg",
  //   title: "RockPlace",
  //   content: "Korn - Falling Away From Me",
  //   online: 42
  // }
];

const friends = [
  // {
  //   id: 1,
  //   avatar: "https://lh6.googleusercontent.com/-HxA1B5K_A60/AAAAAAAAAAI/AAAAAAAAAAs/69R0jNB2PlE/photo.jpg?sz=50",
  //   name: "Cyber Geometry",
  //   status: "Online"
  // }
];

export const LeftPanel = () => (
  <Box>
    <Scrollbars autoHide>
    {/* <Section>
      <Title>Following</Title>
      <Content>
        {rooms.length === 0 && <Empty>You have no following.</Empty>}
        {rooms.map(room => 
          <LeftPanelRoom key={room.id} {...room} />
        )}
      </Content>
    </Section> */}
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