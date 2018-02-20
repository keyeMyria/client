import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const Time = styled.div`
  height: 100%;
  display: flex;
  padding: 0 15px;
  font-size: 13px;
  align-items: center;
  color: ${theme.accent2};
`;

const Now = styled.span`
  color: ${theme.accent2.lighten(0.2)};
  margin-right: 5px;
`;

const All = styled.span`
  margin-left: 5px;
`;

export default class TimeProgress extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    now: '0:00',
    all: '0:00'
  }

  render() {
    const { now, all } = this.props;

    return (
      <Time>
        <Now>{now}</Now>{'/'}<All>{all}</All>
      </Time>
    );
  }
}