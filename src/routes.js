import { RoomContainer } from 'containers/room';
import { MainContainer } from 'containers/main';

export const routes = {
  "*": MainContainer,
  "/:roomName": RoomContainer
};