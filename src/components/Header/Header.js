import React, { PropTypes } from 'react';

const Header = ({ title }) => (
  <div className="Header">
    {title}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;