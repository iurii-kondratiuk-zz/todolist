import React from 'react';

import './Header.css';

const Header = ({ title }) => (
  <div className="Header">
    {title}
  </div>
);

Header.propTypes = {
  title: React.PropTypes.string,
};

export default Header;