import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { FormattedMessage } from 'react-intl';

const LoginForm = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 350px;
	padding: 8px;
`;

const LoginButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 40px;
	font-size: 15px;
	margin: 6px 20px;
	text-align: center;
	border-radius: 4px;
	cursor: pointer;
	transition: all .3s ease;
	background: ${(props) => props.cColor};

	:hover {
		background: ${(props) => props.cColor.lighten(0.1)};
	}
`;

export class AuthModal extends React.Component {
	auth(service) {
		let AUTH_URL = 'http://localhost/auth/';

		if (document.location.protocol == 'https:') {
			AUTH_URL = 'https://rave.pro/auth/';
		}

		window.location = `${AUTH_URL}${service}`;
	}

	render() {
		return (
			<LoginForm>
				<LoginButton cColor={theme.google} onClick={() => this.auth('google')}>
					<FormattedMessage id="topNav.auth.withGoogle"/>
				</LoginButton>
				<LoginButton cColor={theme.vk} onClick={() => this.auth('vkontakte')}>
					<FormattedMessage id="topNav.auth.withVK"/>
				</LoginButton>
				<LoginButton cColor={theme.twitch} onClick={() => this.auth('twitch')}>
					<FormattedMessage id="topNav.auth.withTwitch"/>
				</LoginButton>
			</LoginForm>
		);
	}
}