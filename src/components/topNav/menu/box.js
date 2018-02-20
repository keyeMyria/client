import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  height: 100%;
  position: relative;
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside() {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
     this.props.onClose && this.props.onClose();
    }
  }

  render() {
    return <Box {...this.props}>{this.props.children}</Box>
  }
}