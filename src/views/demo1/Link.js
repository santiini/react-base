import React from 'react';
import PropTypes from 'prop-types';

const Link = ({active, children, handleLink}) => {
  if (active) {
    return <a className="active-filter">{children}</a>
    // return <a className="active-filter">active: {children}</a>
  }
  return (
    <a
      onClick={handleLink}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default Link;