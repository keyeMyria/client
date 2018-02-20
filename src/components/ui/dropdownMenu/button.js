import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static contextTypes = {
    isClose: PropTypes.bool,
    toggleMenu: PropTypes.func
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { className, children } = this.props;

    return (
      <div
        className={className}
        onClick={() => this.context.toggleMenu()}>
        {children}
      </div>
    );
  }
}