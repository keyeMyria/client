import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const waitlistClear = async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation waitlistClear($roomId: Int!) {
        waitlistClear(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });

  if (errors) {
    console.error(errors);
  }
}