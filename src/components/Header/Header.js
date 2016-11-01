import React, { PropTypes } from 'react';

import './Header.css';

const Header = ({ title }) => (
  <div className="Header">
    {title}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;