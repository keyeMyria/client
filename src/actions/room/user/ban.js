import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const ban = async (userId, reason) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation banUserRoom(
        $userId: Int!,
        $roomId: Int!,
        $reason: String
      ) {
        banUserRoom(
          userId: $userId,
          roomId: $roomId,
          reason: $reason
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      userId,
      reason
    }
  });
}