import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, userRoomStore } from 'stores';

export const unfollow = async () => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation unfollowRoom($roomId: Int!) {
        unfollowRoom(roomId: $roomId)
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });

  if (errors) {
    return console.error(errors);
  }

  roomStore.followersCount = data.unfollowRoom;
  userRoomStore.follower = false;
}