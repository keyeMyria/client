import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const BG = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	display: flex;
	top: 0;
	left: 0;
	overflow: auto;
	z-index: 3500;
`;

const BGOut = styled.div`
	position: fixed;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	background: ${theme.dark1};
	opacity: 0.8;
	z-index: 3000;
`;

const Box = styled.div`
	min-width: 240px;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  margin: auto;
  padding: 20px;
  z-index: 3500;
`;

const ModalB = styled.div`
	background: ${theme.dark2};
	border-radius: 4px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	background: ${theme.accent1};
	border-radius: 4px 4px 0 0;
`;

const Title = styled.div`
	padding: 0 20px;
	font-size: 15px;
	color: ${theme.accent2.lighten(0.2)};
`;

const Close = styled.div`
	background: none;
	border: none;
	margin-left: auto;
	padding: 0 20px;
	font-size: 22px;
	color: ${theme.accent2};
	cursor: pointer;

	:hover {
		color: ${theme.accent2.lighten(0.2)};
	}
`;

const Content = styled.div`
	padding: 15px;
`;

export class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		window.addEventListener('keydown', (e) => {
			if (e.keyCode == 27 && !!this.props.modalCurrentName) {
				this.props.onClose();
			}
		}, false);
	}

	render() {
		const {
			isOpen,
			children,
			title,
			onClose
		} = this.props;

    if (!isOpen) {
      return null;
    }

	  return (
	  	<BG>
	  		<BGOut onClick={() => onClose()}></BGOut>
				<Box>
					<ModalB>
			  		<Header>
			  			<Title>{title}</Title>
			  			<Close onClick={() => onClose()}>
			  				<i className="zmdi zmdi-close"></i>
			  			</Close>
			  		</Header>
			  		<Content>{children}</Content>
			  	</ModalB>
		  	</Box>
	  	</BG>
	  );
	}
}