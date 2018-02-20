import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { wsAPI } from 'utils/wsapi';
import { roomStore, userStore } from 'stores';
import { get as getUserRoom } from 'actions/user/room';

export const get = async () => {
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

  if (errors || !data || !data.currentUser) {
    return;
  }

  wsAPI.action('login', data.currentUser.token);

  const { global } = data.currentUser;

  userStore.id = global.id;
  userStore.name = global.name;
  userStore.avatar = global.avatar;
  userStore.role = global.role;
  userStore.banned = global.banned;

  if (roomStore.id) {
    getUserRoom();
  }
}