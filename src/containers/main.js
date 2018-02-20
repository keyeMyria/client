import React from 'react';
import { Main } from 'components/main';
import { mainStore } from 'stores';
import { get as getRooms } from 'actions/main/rooms';

export class MainContainer extends React.Component {
  componentDidMount() {
    getRooms();
  }

  componentWillUnmount() {
    mainStore.reset();
  }

  render() {
    return <Main />
  }
}