import React, { PropTypes } from 'react';

import './Button.css';

const Button = ({ disabled, onClick, text }) => (
	<button
		disabled={disabled}
		className="Button"
		onClick={onClick}
	>
		{text}
	</button>
);

Button.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	text: PropTypes.string,
};

export default Button;
