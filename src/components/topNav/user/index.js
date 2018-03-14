import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'uikit';
import NavButton from 'components/topNav/button';
import { AuthModal } from './auth';
import { UserAboutNavMenu } from './menu';

const Box = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;

const LoginButton = styled(NavButton)`
  button {
    font-size: 12px;
    height: 32px;
    box-shadow: none;
  }
`;

@inject('userStore')
@observer
export class TopNavUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authModalIsOpen: false
    };
  }

  renderGuest() {
    const authModalTitle = (
      <FormattedMessage
        id="topNav.auth.modalTitle"
        defaultMessage="Authorization" />
    );

    return (
      <Box>
        <LoginButton>
          <Button
            color={theme.accent1.lighten(0.3)}
            onClick={() => this.setState({ authModalIsOpen: true })}>
            <FormattedMessage
              id="topNav.auth.loginButton"
              defaultMessage="Login" />
          </Button>
        </LoginButton>
        <Modal
          title={authModalTitle}
          isOpen={this.state.authModalIsOpen}
          onClose={() => this.setState({ authModalIsOpen: false })}>
          <AuthModal />
        </Modal>
      </Box>
    );
  }

  renderUser() {
    return (
      <Box>
        <UserAboutNavMenu />
      </Box>
    );
  }

  render() {
    if (!this.props.userStore.id) {
      return this.renderGuest();
    } else {
      return this.renderUser();
    }
  }
}