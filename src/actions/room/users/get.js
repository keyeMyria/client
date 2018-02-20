import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomUsersStore } from 'stores';

export const get = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getRoomUsers($roomId: Int!) {
        getRoomUsers(roomId: $roomId) {
          site {
            id
            name
            avatar
            role
          }
          room {
            role
          }
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

  roomUsersStore.users = data.getRoomUsers;
}