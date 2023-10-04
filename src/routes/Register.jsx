import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';
import Loader from '../components/Loader';
import { NavLink, Link } from 'react-router-dom';
import { empty, isValidEmail, isset } from '../common/utils';

const defaultStateData = {
  name: '',
  email: '',
  password: '',
  password2: '',
};

function Register() {
  const [formData, setFormData] = useState(defaultStateData);

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { res, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && res && res != null && isset(() => res.message)) {
      toast.success(res.message);
      setFormData(defaultStateData);
      // dispatch(reset());
    }
  }, [res, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onPasswordChange = (e) => {
    // TODO: Implement password strength indicator
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
    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  return (
    <>
      <div className="App">
        <div className="appAside" />
        <div className="appForm pt-5">
          <div className="formTitle">
            <NavLink to="/login" className="formTitleLink">
              Sign In
            </NavLink>{' '}
            <NavLink to="/register" className="formTitleLink">
              Sign Up
            </NavLink>
          </div>

          <div className="formCenter">
            <form onSubmit={onSubmit} className="formFields">
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
                  onChange={onPasswordChange}
                />
              </div>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password2"
                  className="formFieldInput"
                  placeholder="Confirm your password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
              </div>

              <div className="formField flex gap-3 items-center">
                <button className="formFieldButton" type="submit">
                  {isLoading ? <Loader /> : <></>}
                  <span>Sign Up</span>
                </button>{' '}
                <Link to="/login" className="formFieldLink">
                  I'm already member
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
