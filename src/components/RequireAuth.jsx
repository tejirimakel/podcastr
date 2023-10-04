import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserAuthState, isset, updateUserAuthState } from '../common/utils';
import authService from '../features/auth/authService';
// import PropTypes from "prop-types";
import Spinner from '../components/Spinner';
const cred = getUserAuthState();

class RequireAuth extends Component {
  // static propTypes = {
  //   location: PropTypes.object.isRequired,
  // };
  constructor(props) {
    super(props);
    this.state = {
      user: cred,
      isLoading: true,
    };
  }

  logUserOut() {
    this.setState({ user: null, isLoading: false });
  }
  componentDidMount() {
    if (isset(() => this.state.user.token)) {
      authService
        .getMe(this.state.user.token)
        .then((res) => {
          // console.log("Res: ",  res.user);
          if (isset(() => res.user._id)) {
            updateUserAuthState(res.user);
          }
          this.setState({ user: res.user, isLoading: false });
        })
        .catch((err) => {
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          if (
            `${message}` === `Unauthorized` ||
            `${err}`.includes('Request failed with status code 401')
          ) {
            updateUserAuthState(null);
            this.logUserOut();
          }
        });
    } else {
      this.logUserOut();
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }
    const loadedUser = this.state.user;
    // Re read each time we try to render
    const user = getUserAuthState();
    const { children, mustVerify = true } = this.props;

    const location = window.location;
    if (
      mustVerify &&
      (isset(() => user._id) || isset(() => loadedUser._id)) &&
      (user.email_verified_at === null || loadedUser.email_verified_at === null)
    ) {
      return (
        <Navigate to="/verify" replace state={{ path: location.pathname }} />
      );
    }
    // console.log("Render", isset(() => user._id), user._id);
    return isset(() => user._id) || isset(() => loadedUser._id) ? (
      <>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            user: user,
          });
        })}
      </>
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }
}

export default RequireAuth;
