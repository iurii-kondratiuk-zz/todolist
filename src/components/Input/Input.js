import React, { PropTypes } from 'react';

import './Input.css';

export default class Input extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
    placeholder: PropTypes.string,
  }

  state = {
    text: '',
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  }

  handleKeyDown = e => {
    if (e.which === 13) {
      const value = this.state.text.trim();
      if (!value) return;
      this.props.onSave(value);
      this.setState({ text: '' });
    }
  }

  render() {
    return (
      <input
        className="Input"
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
