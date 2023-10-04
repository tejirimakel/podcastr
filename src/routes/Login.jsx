import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { empty, isValidEmail, isset } from '../common/utils';
import authService from '../features/auth/authService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || isset(() => user._id)) {
      if (location.state != null && `${location.state.path}`.length)
        navigate(location.state.path);
      // else navigate("/home");
    }

    dispatch(reset());
  }, [location, user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (empty(() => email)) {
      toast.error('Your email address is required');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Invalid email format, Kindly provide a valid email address');
      return;
    }
    if (empty(() => password)) {
      toast.error('Your password is required');
      return;
    }

    const userData = {
      email,
      password,
    };
    authService
      .login(userData)
      .then((res) => {
        console.log(res);
        if (isset(() => res._id)) {
          toast.success('Logged in successfully!');
          setTimeout(() => {
            if (
              location.state != null &&
              `${location.state.path}`.length &&
              !`${location.state.path}`.includes('/login')
            )
              window.location.href = location.state.path;
            // navigate('/home');
            window.location.href = '/home';
          }, 100);
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(message);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="App">
        <div className="appAside" />
        <div className="appForm pt-5">
          <div className="formTitle">
            <NavLink to="/login" className="formTitleLink">
              Sign In
            </NavLink>{' '}
            or{' '}
            <NavLink to="/register" className="formTitleLink">
              Sign Up
            </NavLink>
          </div>
          <div className="formCenter">
            <form className="formFields" onSubmit={onSubmit}>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </div>

              <div className="formField flex gap-5 items-center">
                <button className="formFieldButton" type="submit">
                  Sign In
                </button>{' '}
                <Link to="/register" className="formFieldLink">
                  Create an account
                </Link>
              </div>

              <div className="socialMediaButtons">
                <div className="facebookButton">
                  {/* <FacebookLoginButton onClick={() => alert("Hello")} /> */}
                </div>

                <div className="instagramButton">
                  {/* <InstagramLoginButton onClick={() => alert("Hello")} /> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
