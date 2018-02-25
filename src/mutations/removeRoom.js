import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const removeRoom = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation removeRoom($roomId: Int!) {
        removeRoom(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });
}