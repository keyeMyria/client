import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomCollectionStore } from 'stores';

export const getRoomCollection = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getRoomCollection($roomId: Int!) {
        getRoomCollection(roomId: $roomId) {
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
      roomId: roomStore.id
    }
  });

  if (errors) {
    return console.error(errors);
  }

  roomCollectionStore.sources = data.getRoomCollection;
}