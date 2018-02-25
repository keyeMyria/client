import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const waitlistAddSource = async (link) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistAddSource($roomId: Int!, $link: String!) {
        waitlistAddSource(roomId: $roomId, link: $link)
      }
    `,
    variables: {
      roomId: roomStore.id,
      link
    }
  });
}