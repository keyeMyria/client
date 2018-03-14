import React from 'react';
import { wsAPI } from 'utils/wsapi';
import { router, setupRoutes, getRoute } from 'utils/router';
import { Loading } from 'uikit/loading';
import { App } from 'components/app';

export class RootApp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			ready: false,
			route: '/', 
			routeParams: {}
		};
	}

	componentWillMount() {
		setupRoutes((route, routeParams) => this.setState({ route, routeParams }));
	}

	componentDidMount() {
		let API_URL = 'ws://localhost/ws';

		if (document.location.protocol == 'https:') {
			API_URL = 'wss://rave.pro/ws';
		}

		wsAPI.URL = API_URL;

		wsAPI.on('connected', () => {
			this.setState({ ready: true });
		});

		wsAPI.on('disconnected', () => {
			this.setState({ ready: false });
		});

		wsAPI.on('reconnected', () => {
			this.setState({ ready: true });
		});

		wsAPI.run();
	}

	render() {
		const { ready, route, routeParams } = this.state;

		if (!ready) return <Loading>Loading...</Loading>;

		return <App>{getRoute(route, routeParams)}</App>;
	}
}