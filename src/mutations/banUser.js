import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';

export const banUser = async (userId, reason) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation banUser(
        $userId: Int!,
        $reason: String
      ) {
        banUser(
          userId: $userId,
          reason: $reason
        )
      }
    `,
    variables: {
      userId,
      reason
    }
  });
}