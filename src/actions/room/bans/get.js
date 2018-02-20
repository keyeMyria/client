import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomBansStore } from 'stores';

export const get = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getRoomBans($roomId: Int!) {
        getRoomBans(roomId: $roomId) {
          user {
            id
            name
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

  roomBansStore.users = data.getRoomBans;
}