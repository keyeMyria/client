import React from 'react';
import PropTypes from 'prop-types';

export default class NavTabsContent extends React.Component {
  static defaultProps = {
    active: null,
    classBase: "Nav"
  }

  static propTypes = {
    active: PropTypes.string,
    classBase: PropTypes.string
  }

  static childContextTypes = {
    active: PropTypes.string,
    classBase: PropTypes.string
  }

  getChildContext() {
    const { active, classBase } = this.props;
    return { active, classBase };
  }

  render() {
    const { classBase, children, className } = this.props;
    return (
      <div className={className}>{children}</div>
    );
  }
}