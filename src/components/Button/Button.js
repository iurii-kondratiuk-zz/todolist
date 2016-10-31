import React from 'react';

import './Button.css';

const Button = ({ disabled, onClick, text }) => (
	<button disabled={disabled}
					className="Button"
					onClick={onClick}>{text}</button>
);

Button.propTypes = {
	disabled: React.PropTypes.bool,
	onClick: React.PropTypes.func,
	text: React.PropTypes.string,
};

export default Button;
