import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserAuthState, isset, updateUserAuthState } from '../common/utils';
import authService from '../features/auth/authService';
import Spinner from './Spinner';
const cred = getUserAuthState();

class RequireNoAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: cred,
      isLoading: true,
    };
  }

  logUserOut() {
    console.log(`logUserOut: ${this.state.isLoading}`);
    this.setState({ user: null, isLoading: false });
    // localStorage.removeItem("user");
  }
  componentDidMount() {
    if (isset(() => this.state.user.token)) {
      authService
        .getMe(this.state.user.token)
        .then((res) => {
          if (isset(() => res.user._id)) updateUserAuthState(res.user);
          this.setState({ user: res.user, isLoading: false });
        })
        .catch((err) => {
          console.log('Error: ', err);
          this.logUserOut();
        });
    } else {
      this.logUserOut();
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    // Re read each time we try to render
    const user = getUserAuthState();

    const { children } = this.props;
    return isset(() => user._id) ? <Navigate to="/home" /> : children;
  }
}

export default RequireNoAuth;
