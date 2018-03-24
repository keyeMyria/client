import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { router } from 'utils/router';
import { FormattedMessage } from 'react-intl';
import { shortNumbers, humanNumbers } from 'utils';

const Box = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: ${theme.dark2};
  margin-bottom: 5px;
  border-radius: 5px;
`;

const Stats = styled.div`
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Online = styled.div`
  font-size: 13px;
  text-align: center;
`;

const OnlineTitle = styled.div`
  padding-top: 5px;
  font-size: 11px;
  text-align: center;
  color: ${theme.accent2};
`;

const Avatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

const AvatarBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 100%;
`;

const AvatarImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 100%;
  user-select: none;
`;

const Data = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

const RoomTitle = styled.div`
  font-size: 13px;
  cursor: pointer;
`;

const PlayData = styled.div`
  padding-top: 5px;
  font-size: 11px;
  color: ${theme.accent2};
`;

const More = styled.div`
  margin-left: auto;
  display: flex;
  padding: 0 20px;
  align-items: center;
`;

const Genre = styled.div`
  text-align: right;
  font-size: 13px;
`;

const PlayType = styled.div`
  padding-top: 5px;
  text-align: right;
  color: ${theme.accent2};
  font-size: 12px;
`;

const getPlayTypeTitle = playType => {
  switch (playType) {
    case 'playlist':
      return 'Плейлист комнаты';
    case 'waitlist':
      return 'Список ожидания';
    default:
      return 'None mode';
  }
}

export const MainRoom = ({
  name,
  connectionsCount,
  avatar,
  title,
  contentTitle
}) => (
  <Box>
    <Stats>
      <div>
        <Online title={humanNumbers(connectionsCount)}>
          {shortNumbers(connectionsCount)}
        </Online>
        <OnlineTitle>Online</OnlineTitle>
      </div>
    </Stats>

    <Avatar onClick={() => router.navigate(`/${name}`)}>
      <AvatarBox>
        {avatar && <AvatarImg src={avatar} />}
      </AvatarBox>
    </Avatar>

    <Data>
      <div>
        <RoomTitle onClick={() => router.navigate(`/${name}`)}>
          {title}
        </RoomTitle>
        <PlayData>
        <div className="MainRoomPlayData">
          {contentTitle ? contentTitle : <FormattedMessage id="main.room.playdata.nothing" />}
        </div>
        </PlayData>
      </div>
    </Data>

    {/* <More>
      <div>
        <Genre>{genre || 'Any genre' }</Genre>
        <PlayType>{getPlayTypeTitle(playType)}</PlayType>
      </div>
    </More> */}
  </Box>
);