import React from 'react';
import { connect } from 'react-redux';

import { requestAuthCode } from '../actions/auth';

class Login extends React.Component {

  login = () => {
    this.props.dispatch(requestAuthCode);
  }

  render() {
    return (
      <div className="Login">
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { accessToken, code } = state.auth;

  return {
    accessToken,
    code,
  }
}

export default connect(mapStateToProps)(Login)

