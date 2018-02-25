import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomBansStore } from 'stores';

export const unbanUserRoom = async (userId) => {
  const { errors } = await apolloClient.mutate({
    mutation: gql`
      mutation unbanUserRoom(
        $userId: Int!
        $roomId: Int!
      ) {
        unbanUserRoom(
          userId: $userId,
          roomId: $roomId
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      userId
    }
  });

  if (errors) {
    return console.errors(errors);
  }

  roomBansStore.removeUser(userId);
}