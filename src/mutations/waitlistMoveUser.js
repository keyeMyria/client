import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const waitlistMoveUser = async (lastPos, newPos) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistMoveUser(
        $roomId: Int!,
        $lastPos: Int!,
        $newPos: Int!
      ) {
        waitlistMoveUser(
          roomId: $roomId,
          lastPos: $lastPos,
          newPos: $newPos
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      lastPos,
      newPos
    }
  });
}