import React from 'react';
import styled from 'styled-components';
import { theme } from 'colors';

const TextField = styled.div`
	padding: 5px 0;
`;

const Label = styled.div`
	visibility: ${({isFocus}) => isFocus ? 'visible' : 'hidden'};
	font-size: 13px;
	padding: 3px 0;
	color: ${theme.accent2};
	opacity: ${({isFocus}) => isFocus ? 1 : 0};
	transition: opacity 0.2s linear;
`;

const InputLine = styled.div`
	display: flex;
`;

const Before = styled.div`
	display: flex;
	height: 40px;
	align-items: center;
	font-size: 13px;
	padding-right: 10px;
	color: ${theme.accent2};
`;

const InputBox = styled.div`
	width: 100%;
`;

const Input = styled.input`
	width: 100%;
	padding: 10px 0;
	background: none;
	border: none;
	border-bottom: 2px solid ${theme.accent1};
	font-size: 13px;
	color: ${theme.text1};
	outline: none;
	transition: border 200ms ease-out;

	:hover {
		border-bottom: 2px solid ${theme.accent1.lighten(0.1)};
	}

	:focus {
		border-bottom: 2px solid ${theme.accent1.lighten(0.3)};
	}
`;

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			onFocus: false,
			isNull: true,
			isChanged: false
		}

		this.handlePressKey = this.handlePressKey.bind(this);
		this.onTextFieldChanged = this.onTextFieldChanged.bind(this);
    this.onTextFieldBlur = this.onTextFieldBlur.bind(this);
    this.onTextFieldFocus = this.onTextFieldFocus.bind(this);
	}

	static defaultProps = {
		name: null,
		value: "",
		placeholder: null,
		onFocus: () => {},
    onBlur: () => {},
		onPressEnter: () => {},
		onChanged: () => {}
	}

	onTextFieldFocus(e) {
		this.setState({ onFocus: true });
		this.props.onFocus(e.currentTarget.value);
	}

  onTextFieldBlur(e) {
    this.setState({ onFocus: false });
    this.props.onBlur(e.currentTarget.value);
  }

	onTextFieldChanged(e) {
		const { name, onChanged } = this.props;

		const textMessage = e.currentTarget.value;

		if( textMessage.length && this.state.isNull ) {
			this.setState({ isNull: false });
		}
		if( !textMessage.length && !this.state.isNull ) {
			this.setState({ isNull: true });
		}
		if( !this.state.isChanged ) {
			this.setState({ isChanged: true });
		}

		onChanged(textMessage);
	}

	handlePressKey(e) {
    if (e.key === 'Enter') {
      this.props.onPressEnter();
    }
  }

	render() {
		const { label, before, placeholder, value } = this.props;

		const isFocus = this.state.onFocus ||
										!this.state.isNull ||
										(!this.state.isChanged && this.props.value);

		return (
			<TextField>
				<Label isFocus={isFocus}>{label}</Label>
				<InputLine>
					{before && <Before>{before}</Before>}
					<InputBox>
						<Input
							autoFocus={this.props.autoFocus}
							defaultValue={value}
							placeholder={this.state.onFocus ? "" : (placeholder || label)}
							onFocus={this.onTextFieldFocus}
							onKeyPress={this.handlePressKey}
							onBlur={this.onTextFieldBlur}
							onChange={this.onTextFieldChanged} />
					</InputBox>
				</InputLine>
			</TextField>
		);
	}
}