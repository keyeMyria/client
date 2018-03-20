import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomCollectionStore } from 'stores';

export const collectionStart = async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation collectionStart($roomId: Int!) {
        collectionStart(roomId: $roomId)
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