import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { timeFormat } from 'utils';

import ProgressLine from './progress';
import { PlayControl } from './play';
import { VolumeControl } from './volume';
import TimeProgress from './time';

const Box = styled.div`
	display: flex;
	width: 100%;
	height: 38px;
	padding-top: 3px;
	background: ${theme.dark2};
	position: absolute;
	bottom: 0;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export class PlayerControl extends React.Component {
	constructor(props) {
		super(props);
		this.progressUpdate = false;
		this.state = {
			progressPart: 0,
			currentHuman: '0:00',
			durationHuman: '0:00'
		};
	}

	componentDidMount() {
		this.progressUpdate = true;
		this.updateProgress();
	}

	componentWillUnmount() {
		this.progressUpdate = false;
	}

	updateProgress(timeOut = 1e3) {
		this.updateProgressData();
		this.progressUpdate && setTimeout(() => this.updateProgress(), timeOut);
	}

	updateProgressData() {
		if (!this.progressUpdate) {
			return;
		}

		const { start, duration } = this.props;

		if (duration === 0) {
			return;
		}

		const getCorr = (c, d) => {
			const m = '00:00:00';
			const dl = d.length;
			const cl = c.length;
			return m.substr(-1 * dl, dl).substr(0, dl - cl) + c;
		};

		const now = Math.floor(Date.now() / 1000);
		const current = now - start;
		let currentHuman = timeFormat(current);
		const durationHuman = timeFormat(duration);
		const progressPart = current * 100 / duration;

		currentHuman = getCorr(currentHuman, durationHuman);

		this.setState({
			progressPart,
			currentHuman,
			durationHuman
		});
	}

	removeProgress() {
		this.progressUpdate = false;

		this.setState({
			progressPart: 0,
			currentHuman: '0:00',
			durationHuman: '0:00'
		});
	}

	render() {
		const isNeedTime = this.props.duration > 0;
		const progressPart = isNeedTime ? this.state.progressPart : 0;

		return (
			<Box>
				<ProgressLine partValue={progressPart} />
				<PlayControl />
				<VolumeControl />
				{isNeedTime && <TimeProgress now={this.state.currentHuman} all={this.state.durationHuman} />}
			</Box>
		);
	}
}
