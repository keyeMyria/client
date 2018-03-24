import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { followRoomsStore } from 'stores';

export const getFollowRooms = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getFollowRooms {
        getFollowRooms {
          id
          name
          title
          avatar
          connectionsCount
          contentTitle
        }
      }
    `
  });

  if (errors) {
    return console.error(errors);
  }

  followRoomsStore.rooms = data.getFollowRooms;
}