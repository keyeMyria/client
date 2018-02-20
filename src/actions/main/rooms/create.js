import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { mainStore } from 'stores';
import { get as getRooms } from 'actions/main/rooms';

export const create = async ({ title, name }) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation createRoom(
        $name: String!,
        $title: String!
      ) {
        createRoom(
          name: $name,
          title: $title
        )
      }
    `,
    variables: {
      name,
      title
    }
  });

  if (errors) {
    return console.error(errors);
  }
  
  mainStore.modal = '';
  getRooms();
}