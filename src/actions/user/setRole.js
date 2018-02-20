import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';

export const setRole = async (userId, role) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation setRoleUser(
        $userId: Int!,
        $role: String!
      ) {
        setRoleUser(
          userId: $userId,
          role: $role
        )
      }
    `,
    variables: {
      userId,
      role
    }
  });
}