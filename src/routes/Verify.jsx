import React, { useState, useEffect } from 'react';
// @see https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { resendEmailOTP, reset, verifyEmail } from '../features/auth/authSlice';
import Loader from '../components/Loader';
import { empty, isset, isValidEmail } from '../common/utils';

function Verify() {
  const params = useParams();
  const [formData, setFormData] = useState({
    email:
      empty(() => params.email) || !isValidEmail(params.email)
        ? ''
        : params.email,
    otp: empty(() => params.otp) ? '' : params.otp,
  });

  const { email, otp } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, res, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && res && res != null && isset(() => res.message)) {
      toast.success(res.message);
      if (isset(() => res.verified)) dispatch(reset());
    }
    if (
      isSuccess ||
      (isset(() => user._id) && user.email_verified_at !== null)
    ) {
      navigate('/home');
    }

    dispatch(reset());
  }, [user, res, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    if (e !== null) e.preventDefault();

    if (empty(() => email)) {
      toast.error('Your email address is required');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Invalid email format, Kindly provide a valid email address');
      return;
    }
    if (empty(() => otp)) {
      toast.error(
        'Verification Token is required, Kindly enter your verification token'
      );
      return;
    }

    const userData = {
      email,
      otp,
    };

    dispatch(verifyEmail(userData));
  };
  // if(isValidEmail(email) && !empty(() => otp)){
  //   // onSubmit(null);
  // }

  const resendVerificationEmail = (e) => {
    e.preventDefault();
    if (empty(() => email)) {
      toast.error('Please, enter an email to receive verification mail');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Invalid email format, Kindly provide a valid email address');
      return;
    }

    const userData = {
      email,
    };

    dispatch(resendEmailOTP(userData));
  };

  return (
    <>
      <div className="App">
        <div className="appAside" />
        <div className="appForm pt-5">
          <div className="formTitle">Verify Your Email</div>
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
                <label className="formFieldLabel" htmlFor="otp">
                  Verification Token
                </label>
                <input
                  type="text"
                  id="otp"
                  className="formFieldInput"
                  placeholder="Enter your otp"
                  name="otp"
                  value={otp}
                  onChange={onChange}
                />
              </div>

              <div className="formField flex gap-3 items-center">
                <button className="formFieldButton" type="submit">
                  {isLoading ? <Loader /> : <></>}
                  <span>Verify</span>
                </button>
                {'  '}&nbsp;
                <button
                  onClick={resendVerificationEmail}
                  className="formFieldLink"
                  title="Kindly fillout your email to resend verification to"
                >
                  Resend Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* {isLoading ? <Spinner /> : <></>} */}
    </>
  );
}

export default Verify;
