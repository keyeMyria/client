import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const waitlistRemoveUser = async (userId) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistRemoveUser($roomId: Int!, $userId: Int!) {
        waitlistRemoveUser(roomId: $roomId, userId: $userId)
      }
    `,
    variables: {
      roomId: roomStore.id,
      userId
    }
  });
}