import React from 'react';

import './Button.css';

const Button = ({ disabled, onClick, text }) => (
	<button disabled={disabled}
					className="Button"
					onClick={onClick}>{text}</button>
);

export default Button;
