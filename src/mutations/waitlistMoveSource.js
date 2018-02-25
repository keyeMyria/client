import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const waitlistMoveSource = async (lastPos, newPos) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation waitlistMoveSource(
        $roomId: Int!,
        $lastPos: Int!,
        $newPos: Int!
      ) {
        waitlistMoveSource(
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