import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { wsAPI } from 'utils/wsapi';
import { userStore, roomStore } from 'stores';
import { userRoom } from 'queries/userRoom';

export const getRoomByName = async (roomName) => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getRoomByName($roomName: String!) {
        getRoomByName(roomName: $roomName) {
          id
          name
          title
          avatar
          followerMode
          slowMode
          followersCount
          collectionCount
          connectionsCount
          usersCount
          guestsCount
          mode
        }
      }
    `,
    variables: {
      roomName
    }
  });
  
  if (errors) {
    const error = errors[0].message;
    
    const errorStatus = {
      NotFound: 'notfound',
      RoomBanned: 'banned',
      UserRoomBanned: 'userbanned'
    };

    roomStore.status = errorStatus[error] || 'error';
    return;
  }

  const { getRoomByName } = data;

  roomStore.id = getRoomByName.id;
  roomStore.name = getRoomByName.name;
  roomStore.title = getRoomByName.title;
  roomStore.avatar = getRoomByName.avatar;
  roomStore.followerMode = getRoomByName.followerMode;
  roomStore.slowMode = getRoomByName.slowMode;
  roomStore.followersCount = getRoomByName.followersCount;
  roomStore.collectionCount = getRoomByName.collectionCount;
  roomStore.connectionsCount = getRoomByName.connectionsCount;
  roomStore.usersCount = getRoomByName.usersCount;
  roomStore.guestsCount = getRoomByName.guestsCount;
  roomStore.mode = getRoomByName.mode;

  roomStore.status = 'ready';
  
  wsAPI.action('join', getRoomByName.id);

  if (userStore.id) {
    userRoom();
  }
}