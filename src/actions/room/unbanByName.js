import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { getByName } from 'actions/room/getByName';

export const unbanByName = async (roomName) => {
  await apolloClient.mutate({
    mutation: gql`
      mutation unbanRoomByName($roomName: String!) {
        unbanRoomByName(roomName: $roomName)
      }
    `,
    variables: {
      roomName
    }
  });

  getByName(roomName);
}