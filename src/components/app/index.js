import React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { ThemeProvider } from 'styled-components';
import { colors, theme } from 'colors';
import { Loading } from 'uikit/loading';

import { Modal } from 'uikit/modal';
import TopNav from 'components/topNav';
import { LeftPanel } from 'components/leftPanel';
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

const Top = styled.div`
	height: 50px;
	width: 100%;
	border-bottom: 1px solid ${theme.dark1};
	position: relative;
	z-index: 1000;
`;

const Content = styled.div`
	height: calc(100% - 51px);
	display: flex;
`;

const Left = styled.div`
	height: 100%;
	width: 240px;
	overflow: hidden;
	background: ${theme.dark1};
`;

const Right = styled.div`
	height: 100%;
	flex: 1;
	overflow: hidden;
	position: relative;
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
          <Top>
            <TopNav />
          </Top>
          <Content>
            <Left>
              <LeftPanel/>
            </Left>
            <Right>
              {children}
            </Right>
          </Content>
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