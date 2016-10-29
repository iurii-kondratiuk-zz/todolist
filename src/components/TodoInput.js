import React from 'react';

import './TodoInput.css';

export default class TodoInput extends React.Component {
	static propTypes = {
    onSave: React.PropTypes.func.isRequired,
  }

  state = {
  	text: '',
  }

  handleChange = e => {
  	this.setState({ text: e.target.value });
  }

  handleKeyDown = e => {
  	if (e.which === 13) {
      this.props.onSave(e.target.value);
      this.setState({ text: '' });
    }
  }

	render() {
		return (
			<input
        className="TodoInput"
        type="text"
        placeholder={'Add a to-do in "Inbox"...'}
        autoFocus="true"
        value={this.state.text}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
       />
		);
	}
}
