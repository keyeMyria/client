import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const skip = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistSkip($roomId: Int!) {
        waitlistSkip(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });
}