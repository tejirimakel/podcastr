import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Footer from "../components/Sections/Footer";

function Onboarding() {
  const { quill, quillRef } = useQuill();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!(user && user._id)) {
      navigate("/login");
    }

    if (user.profile_completed_at !== null) {
      navigate("/home");
    }

    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        console.log("Text change!");
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch, quill]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
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
            <h3 className="formTitleLink">Onboarding</h3>
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
                  onChange={onChange}
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
              <div className="formField">
                <label className="aboutmerte" htmlFor="password">
                  About Me
                </label>
                <div style={{ width: 500, height: 300 }}>
                  <div ref={quillRef} id="aboutmerte" />
                </div>
              </div>

              <div className="formField">
                <button className="formFieldButton" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Onboarding;
