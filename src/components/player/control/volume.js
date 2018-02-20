import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';

const Volume = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  input[type=range] {
    width: 80px;
    display: flex;
  }
`;

const Mute = styled.div`
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
export class VolumeControl extends React.Component {
  constructor(props) {
    super(props);
    this.setVolume = this.setVolume.bind(this);
  }

  setVolume(e) {
    const volume = parseInt(e.target.value, 10);
    this.props.roomPlayerStore.volume = volume;
  }

  render() {
    const { roomPlayerStore } = this.props;
    const { mute, volume } = roomPlayerStore;

    let volumeIconClass = 'zmdi';
    if (!mute && volume >= 50) volumeIconClass += ' zmdi-volume-up';
    else if (mute || volume == 0) volumeIconClass += ' zmdi-volume-off';
    else if (!mute && volume < 50 && volume > 0) volumeIconClass += ' zmdi-volume-down';
    
    return (
      <Volume>
        <Mute onClick={() => roomPlayerStore.triggerMute()}>
          <i className={volumeIconClass}></i>
        </Mute>
        <input
          type="range"
          onChange={this.setVolume}
          defaultValue={volume}/>
      </Volume>
    );
  }
}