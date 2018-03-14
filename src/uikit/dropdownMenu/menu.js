import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.state = { isClose: true };
  }

  static childContextTypes = {
    isClose: PropTypes.bool,
    closeMenu: PropTypes.func,
    toggleMenu: PropTypes.func
  }

  getChildContext() {
    return {
      isClose: this.state.isClose,
      closeMenu: () => this.closeMenu(),
      toggleMenu: () => this.toggleMenu()
    };
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
      this.setState({ isClose: true });
    }
  }

  closeMenu() {
    this.setState({ isClose: true });
  }

  toggleMenu() {
    this.setState({ isClose: !this.state.isClose });
  }

  render() {
    const { className, children } = this.props;

    return <div style={{position: 'relative'}} className={className}>{children}</div>
  }
}