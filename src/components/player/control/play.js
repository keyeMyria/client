import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

const Play = styled.div`
  margin-left: 8px;
  display: flex;
  width: 40px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  i {
    font-size: 22px;
    color: ${theme.accent2};
  }
`;

@inject('roomPlayerStore')
@observer
export class PlayControl extends React.Component {
  render() {
    const { roomPlayerStore } = this.props;
    const paused = roomPlayerStore.paused;

    return (
      <Play onClick={() => roomPlayerStore.triggerPlay()}>
        <i className={`zmdi zmdi-${paused ? 'play' : 'stop'}`}></i>
      </Play>
    );
  }
}