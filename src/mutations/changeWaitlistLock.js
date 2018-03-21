import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const changeWaitlistLock = async () => {
  await apolloClient.mutate({
    mutation: gql`
      mutation changeWaitlistLock(
        $roomId: Int!,
        $isLock: Boolean!
      ) {
        changeWaitlistLock(
          roomId: $roomId,
          isLock: $isLock
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      isLock: !roomStore.waitlistLock
    }
  })
}