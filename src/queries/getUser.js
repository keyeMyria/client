import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { wsAPI } from 'utils/wsapi';
import { roomStore, userStore } from 'stores';

export const getUser = async () => {
  const { data, errors } = await apolloClient.query({
    query: gql`
      query getUser {
        currentUser {
          global {
            id
            name
            avatar
            role
            banned
            unbanDate
          }
          token
        }
      }
    `
  });

  if (errors || !data) {
    return;
  }

  if (!data.currentUser) {
    userStore.status = 'ready';
    return;
  }

  wsAPI.action('login', data.currentUser.token);

  const { global } = data.currentUser;

  userStore.id = global.id;
  userStore.name = global.name;
  userStore.avatar = global.avatar;
  userStore.role = global.role;
  userStore.banned = global.banned;
  userStore.status = 'ready';
}