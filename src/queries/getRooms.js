import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { mainStore } from 'stores';

export const getRooms = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getRooms {
        getRooms {
          id
          name
          title
          avatar
          usersCount
          guestsCount
          contentTitle
        }
      }
    `   
  });

  if (errors) {
    mainStore.status = 'error';
    return console.error(errors);
  }
  
  mainStore.rooms = data.getRooms;
  mainStore.status = 'ready';
}