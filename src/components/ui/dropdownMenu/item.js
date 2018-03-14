import React from 'react';
import PropTypes from 'prop-types';

export class DropdownMenuItem extends React.Component {
  static contextTypes = {
    closeMenu: PropTypes.func
  }

  onClick() {
    const { onClick } = this.props;
    !!onClick && onClick();
    this.context.closeMenu();
  }

  render() {
    const { className, children } = this.props;

    return (
      <div
        onClick={() => this.onClick()}
        className={className}>
        {children}
      </div>
    );
  }
}