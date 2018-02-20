import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const kickUser = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistKick($roomId: Int!) {
        waitlistKick(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });
}