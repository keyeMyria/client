import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const addUser = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistAdd($roomId: Int!) {
        waitlistAdd(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });
}