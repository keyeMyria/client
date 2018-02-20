import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const createMessage = async (message) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation createRoomMessage($roomId: Int!, $message: String!) {
        createRoomMessage(roomId: $roomId, message: $message)
      }
    `,
    variables: {
      roomId: roomStore.id,
      message
    }
  });
}