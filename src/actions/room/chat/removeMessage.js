import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const removeMessage = async (messageId) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation removeRoomMessage($roomId: Int!, $messageId: String!) {
        removeRoomMessage(roomId: $roomId, messageId: $messageId)
      }
    `,
    variables: {
      roomId: roomStore.id,
      messageId
    }
  });
}