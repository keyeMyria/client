import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, userRoomStore } from 'stores';

export const userRoom = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query userRoom($roomId: Int!) {
        userRoom(roomId: $roomId) {
          banned
          follower
          role
          unbanDate
        }
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });

  if (errors) {
    return console.error(errors);
  }

  const { userRoom } = data;

  userRoomStore.role = userRoom.role;
  userRoomStore.banned = userRoom.banned;
  userRoomStore.follower = userRoom.follower;

  if (userRoom.banned) {
    roomStore.status = 'userbanned';
  }
}