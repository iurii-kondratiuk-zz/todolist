import React from 'react';
import classnames from 'classnames';

import './Checkbox.css';

const Checkbox = ({ checked, onChange }) => (
  <div className={classnames('Checkbox', { 'Checkbox--checked': checked })}
       onClick={(e) => {
       	e.stopPropagation()
    		e.preventDefault()
       	onChange(e);
       }} />
);


Checkbox.propTypes = {
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

export default Checkbox;
