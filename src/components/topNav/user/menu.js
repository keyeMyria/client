import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { theme } from 'colors';
import { inject, observer } from 'mobx-react';

import * as NavMenu from 'components/topNav/menu';
import { Caret } from 'uikit';

const UserAboutName = styled.div`
	font-size: 13px;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const UserInfo = styled.div`padding: 0 14px;`;

const Username = styled.div`
	font-size: 12.5px;
	color: ${theme.accent2.lighten(0.4)};
	font-weight: 500;
`;

const Status = styled.div`
	font-size: 10.5px;
	margin-top: 2px;
	text-align: right;
	color: ${theme.accent2};
	font-weight: 500;
`;

const AvatarBox = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	margin: 0 5px;
	border-radius: 100%;
`;

const AvatarImg = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 18px;
	user-select: none;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

@inject('userStore')
@observer
export class UserAboutNavMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isClose: true
		};
	}

	toggle() {
		this.setState({ isClose: !this.state.isClose });
	}

	close() {
		this.setState({ isClose: true });
	}

	logout() {
		let BASE_URL = 'http://localhost/';

		if (document.location.protocol == 'https:') {
			BASE_URL = 'https://rave.pro/';
		}

		window.location = `${BASE_URL}logout`;
	}

	render() {
		const { name, avatar } = this.props.userStore;

		return (
			<NavMenu.Box onClose={() => this.close()}>
				<NavMenu.Target isActive={!this.state.isClose} onClick={() => this.toggle()}>
					<UserInfo>
						<Username>{name}</Username>
						<Status>Online</Status>
					</UserInfo>
					<AvatarBox>
						<AvatarImg src={avatar} />
					</AvatarBox>
					<Caret />
				</NavMenu.Target>
				<NavMenu.Menu isClose={this.state.isClose}>
					<NavMenu.Actions>
						<NavMenu.Action onClick={() => this.logout()}>
							<FormattedMessage id="topNav.auth.logoutButton" />
						</NavMenu.Action>
					</NavMenu.Actions>
				</NavMenu.Menu>
			</NavMenu.Box>
		);
	}
}
