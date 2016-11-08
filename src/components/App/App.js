import React from 'react';
import { connect } from 'react-redux';

import { authenticate, requestAuthCode } from '../../actions/auth';

import Header from '../Header';
import Inbox from '../Inbox';

class App extends React.Component {

  // componentDidMount() {
  //   const { dispatch, accessToken, code } = this.props;
  //   console.log('App', accessToken, code);
  //   //dispatch(requestAuthCode);
  // }

  componentDidMount() {
    const { dispatch, accessToken, router } = this.props;
    const { code } = router.location.query;
    if (accessToken) {
      return console.log('fetch todos', accessToken)
    }
    if (code) {
      return dispatch(authenticate(code));
    } 
    this.props.router.replace('/');
  }

  render() {
    return (
      <div className="App">
        <Header title="Inbox" />
        <Inbox />
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

export default connect(mapStateToProps)(App)

