import React from 'react';

import './Input.css';

export default class Input extends React.Component {
  static propTypes = {
    onSave: React.PropTypes.func,
    placeholder: React.PropTypes.string,
  }

  state = {
    text: '',
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  }

  handleKeyDown = e => {
    if (e.which === 13) {
      const value = e.target.value.trim();
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