import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const removeSource = async (sourceId) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistRemoveSource($roomId: Int!, $sourceId: Int!) {
        waitlistRemoveSource(roomId: $roomId, sourceId: $sourceId)
      }
    `,
    variables: {
      roomId: roomStore.id,
      sourceId
    }
  });
}