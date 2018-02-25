import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { roomStore, roomModeWaitlistStore } from 'stores';

export const getWaitlist = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getWaitlist($roomId: Int!) {
        getWaitlist(roomId: $roomId) {
          userPlaylist {
            id
            title
            cover
            service
            duration
            serviceId
          }
          users {
            id
            name
          }
          playData {
            source {
              id
              title
              cover
              service
              duration
              serviceId
            }
            user {
              id
              name
            }
            start
            serverTime
          }
        }
      }
    `,
    variables: {
      roomId: roomStore.id
    }
  });

  if (errors) {
    return console.error(errors);
  }

  const playData = data.getWaitlist ? data.getWaitlist.playData : null;
  const userPlaylist = data.getWaitlist ? data.getWaitlist.userPlaylist : [];
  const users = data.getWaitlist ? data.getWaitlist.users : [];

  roomModeWaitlistStore.setPlayData(playData);
  roomModeWaitlistStore.userPlaylist = userPlaylist;
  roomModeWaitlistStore.users = users;
}