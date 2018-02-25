import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

// import { modalFullClose } from 'old/modal';

const ModalFull = styled.div`
	position: fixed;
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
	background: ${theme.dark2};
	border-bottom: 1px solid ${theme.dark1};
	border-radius: 2px 2px 0 0;
`;

const HeaderBox = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
`;

const Title = styled.div`
	padding: 0 20px;
	font-size: 16px;
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
`;

const Content = styled.div`
	height: calc(100% - 50px);
`;

const ContentBox = styled.div`
	height: 100%;
	width: 1200px;
	margin: auto;
`;

const RCModalFull = ({
	children,
	name,
	title,
	currentName,
	modalFullClose
}) => {
	if (name != currentName) {
		return null;
	}

	return (
		<ModalFull>
			<Scrollbars>
			<Header>
				<HeaderBox>
					<Title>{title}</Title>
					<Close onClick={() => modalFullClose()}>
						<i className="zmdi zmdi-close"></i>
					</Close>
				</HeaderBox>
			</Header>
			<Content>
				<ContentBox>{children}</ContentBox>
			</Content>
			</Scrollbars>
		</ModalFull>
	);
};

export default connect(
  (state) => ({
    currentName: state.modal.fullModalName
  }),
  (dispatch) => ({
  	modalFullClose() {
  		dispatch( modalFullClose() );
  	}
  })
)(RCModalFull);