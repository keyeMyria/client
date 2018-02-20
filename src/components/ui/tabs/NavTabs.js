import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
  static defaultProps = {
    active: null,
    onSelect: () => {}
  }

  static childContextTypes = {
    active: PropTypes.string,
    classBase: PropTypes.string,
    onSelect: PropTypes.func
  }

  getChildContext() {
    const { active, classBase, onSelect } = this.props;
    return { active, classBase, onSelect };
  }

  render() {
    const { className, children } = this.props;

    return <div className={className}>{children}</div>
  }
}