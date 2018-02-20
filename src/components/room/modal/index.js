import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { theme } from 'colors';
import { Scrollbars } from 'react-custom-scrollbars';

const Box = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: block;
	top: 0;
	left: 0;
	background: ${theme.dark2};
	z-index: 2800;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
  padding: 8px 10px;
	background: ${theme.dark2};
`;

const HeaderBox = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`;

const Title = styled.div`
	padding: 0 20px;
	font-size: 15px;
	color: ${theme.accent2.lighten(0.2)};
	display: flex;
	align-items: center;
`;

const Close = styled.div`
	background: none;
	border: none;
	margin-left: auto;
	padding: 0 20px;
	font-size: 22px;
	color: ${theme.accent2};
	cursor: pointer;
	display: flex;
	align-items: center;

  :hover {
    color: ${theme.accent2.lighten(0.8)};
  }
`;

const Content = styled.div`
	height: calc(100% - 66px);
`;

const ContentBox = styled.div`
	height: 100%;
	width: calc(100% - 60px);
  padding: 0 30px;
`;

@inject('roomStore')
@observer
export class RoomModal extends React.Component {
  close() {
    this.props.roomStore.tab = '';
  }

  render() {
    const {
      children,
      name,
      title
    } = this.props;

    if (name != this.props.roomStore.tab) {
      return null;
    }
  
    return (
      <Box>
        <Scrollbars>
        <Header>
          <HeaderBox>
            <Title>{title}</Title>
            <Close onClick={() => this.close()}>
              <i className="zmdi zmdi-close"></i>
            </Close>
          </HeaderBox>
        </Header>
        <Content>
          <ContentBox>{children}</ContentBox>
        </Content>
        </Scrollbars>
      </Box>
    );
  }
}