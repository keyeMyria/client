import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const changeSlowMode = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation changeSlowMode(
        $roomId: Int!,
        $isActive: Boolean!
      ) {
        changeSlowMode(
          roomId: $roomId,
          isActive: $isActive
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      isActive: !roomStore.slowMode
    }
  });
}