import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomCollectionStore } from 'stores';

export const collectionRemoveSource = async (roomSourceId) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation collectionRemoveSource($roomId: Int!, $roomSourceId: Int!) {
        collectionRemoveSource(roomId: $roomId, roomSourceId: $roomSourceId)
      }
    `,
    variables: {
      roomId: roomStore.id,
      roomSourceId
    }
  });

  if (errors) {
    console.error(errors);
  }

  if (data && data.collectionRemoveSource) {
    roomCollectionStore.removeSource(roomSourceId);
  }
}