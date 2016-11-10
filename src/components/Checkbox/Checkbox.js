import React, { PropTypes } from 'react';
import classnames from 'classnames';

const Checkbox = ({ checked, onChange }) => (
  <div 
    className={classnames('Checkbox', { 'Checkbox--checked': checked })}
    onClick={onChange}
  />
);


Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
