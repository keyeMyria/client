import React from 'react';
import PropTypes from 'prop-types';

export default class NavTabContent extends React.Component {
  static contextTypes = {
    classBase: PropTypes.string,
    active: PropTypes.string
  }

  static defaultProps = {
    name: null
  }

  static propTypes = {
    name: PropTypes.string
  }

  render() {
    const { name, children, className } = this.props;
    const { active } = this.context;

    if (name != active) {
      return null;
    }

    return <div className={className}>{children}</div>
  }
}