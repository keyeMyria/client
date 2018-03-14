import React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { ThemeProvider } from 'styled-components';
import { colors, theme } from 'colors';
import { Loading } from 'uikit/loading';

import { Modal } from 'uikit/modal';
import { SetUserBan } from 'components/setUserBan';
import { SetUserRole } from 'components/setUserRole';
import './styles';

import { getUser } from 'queries/getUser';

const Box = styled.div`
	background: ${theme.dark1};
	color: ${theme.text1};
	height: 100%;
	overflow: auto;
	min-width: 1000px;
`;

@inject('userStore', 'setBanFormStore', 'setRoleFormStore')
@observer
export class App extends React.Component {
  componentDidMount() {
    getUser();
  }

  renderApp() {
    const {
      setBanFormStore,
      setRoleFormStore,
      children
    } = this.props;

    return (
      <ThemeProvider theme={colors}>
        <Box>
          {children}
          <Modal
            isOpen={setBanFormStore.open}
            onClose={setBanFormStore.close}
            title="Set Global Ban">
            <SetUserBan />
          </Modal>
          <Modal
            isOpen={setRoleFormStore.open}
            onClose={setRoleFormStore.close}
            title="Set Global Role">
            <SetUserRole />
          </Modal>
        </Box>
      </ThemeProvider>
    );
  }

  render() {
    const { status } = this.props.userStore;

    switch (status) {
      case 'loading':
        return <Loading>Loading...</Loading>
      case 'ready':
        return this.renderApp();
      default:
        return <Loading>Error</Loading>
    }
  }
}