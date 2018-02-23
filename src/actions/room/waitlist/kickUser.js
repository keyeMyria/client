import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const kickUser = async (current) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistKick($roomId: Int!, $current: Boolean) {
        waitlistKick(roomId: $roomId, current: $current)
      }
    `,
    variables: {
      roomId: roomStore.id,
      current
    }
  });
}