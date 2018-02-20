import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const removeAllMessages = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation clearRoomChat($roomId: Int!) {
        clearRoomChat(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });
}