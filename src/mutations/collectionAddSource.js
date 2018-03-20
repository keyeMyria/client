import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomCollectionStore } from 'stores';

export const collectionAddSource = async (link, useTimecode) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation collectionAddSource(
        $roomId: Int!,
        $link: String!,
        $useTimecode: Boolean
      ) {
        collectionAddSource(
          roomId: $roomId,
          link: $link,
          useTimecode: $useTimecode
        ) {
          id
          source {
            id
            title
            cover
            service
            duration
            serviceId 
          }
        }
      }
    `,
    variables: {
      roomId: roomStore.id,
      link,
      useTimecode
    }
  });

  if (errors) {
    console.error(errors);
  }

  if (data && data.collectionAddSource) {
    roomCollectionStore.addSource(data.collectionAddSource);
  }
}