import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const waitlistAddSource = async (link, useTimecode) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistAddSource(
        $roomId: Int!,
        $link: String!,
        $useTimecode: Boolean
      ) {
        waitlistAddSource(
          roomId: $roomId,
          link: $link,
          useTimecode: $useTimecode
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      link,
      useTimecode
    }
  });
}