import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, userRoomStore } from 'stores';

export const follow = async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation followRoom($roomId: Int!) {
        followRoom(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });

  if (errors) {
    return console.error(errors);
  }

  roomStore.followersCount = data.followRoom;
  userRoomStore.follower = true;
}