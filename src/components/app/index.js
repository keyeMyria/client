import React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { ThemeProvider } from 'styled-components';
import { colors, theme } from 'colors';

import { Modal } from 'components/ui';
import { SetUserBan } from 'components/setUserBan';
import { SetUserRole } from 'components/setUserRole';
import './styles';

import { get as getCurrentUser } from 'actions/user';

const Box = styled.div`
	background: ${theme.dark1};
	color: ${theme.text1};
	height: 100%;
	overflow: auto;
	min-width: 1000px;
`;

@inject('setBanFormStore', 'setRoleFormStore')
@observer
export class App extends React.Component {
  componentDidMount() {
    getCurrentUser();
  }

  render() {
    const { setBanFormStore, setRoleFormStore, children } = this.props;

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
}