import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore } from 'stores';

export const setTitle = async (title) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation setRoomTitle(
        $roomId: Int!,
        $title: String!
      ) {
        setRoomTitle(
          roomId: $roomId,
          title: $title
        )
      }
    `,
    variables: {
      roomId: roomStore.id,
      title
    }
  })
}