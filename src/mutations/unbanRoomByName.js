import { apolloClient } from 'utils/apolloClient';
import gql from 'graphql-tag';
import { getRoomByName } from 'queries/getRoomByName';

export const unbanRoomByName = async (roomName) => {
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

  getRoomByName(roomName);
}