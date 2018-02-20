import React from 'react';
import PropTypes from 'prop-types';

export default class NavTab extends React.Component {
  static contextTypes = {
    active: PropTypes.string,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    name: null,
    title: null
  }

  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string
  }

  render() {
    const { name, title, children, className } = this.props;
    const { active, onSelect } = this.context;
    return (
      <div
        className={className}
        onClick={() => onSelect(name)}>{title || children}</div>
    );
  }
}