import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const ban = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation banRoom($roomId: Int!) {
        banRoom(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });
}