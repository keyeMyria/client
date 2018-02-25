import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const setRoleUserRoom = async (userId, role) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation setRoleUserRoom(
        $userId: Int!,
        $roomId: Int!,
        $role: String!
      ) {
        setRoleUserRoom(
          userId: $userId,
          roomId: $roomId,
          role: $role
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      userId,
      role
    }
  });
}