import React, { Component } from "react";

class General extends Component {
  constructor() {
    super();

    this.state = {
      oldPassword: "",
      newPassword: "",
      cPassword: "",
      email: "timidakolo@gmail.com"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div
          className="container"
          style={{ width: "70%", marginRight: "1.5px" }}
        >
          <div className="font18 extraBold" style={{ marginTop: "5rem", marginBottom: "1rem" }}>
            <h1>Login Details</h1>
            <p >Login Email:</p>
          </div>
          <hr />
          <div className="" style={{ marginTop: "1.5rem" }}>
            <h2>Password</h2>
            <p>Change your account password below.</p>
          </div>
          <div className="formCenter" style={{ marginTop: "2.5rem" }}>
            <form className="row g-3  formFields" onSubmit={this.handleSubmit}>
              <div className="formField col-md-12">
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Old Password"
                  name="password"
                  value={this.state.oldPassword}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formField col-md-12">
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="New Password"
                  name="password"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                />
              </div>
              <div className="formField col-md-12">
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Comfirm Password"
                  name="password"
                  value={this.state.cPassword}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-12 formField ">
                <button
                  type="submit"
                  onClick={(event) => (window.location.href = "settings")}
                  className="formFieldButton "
                >
                  Save
                </button>
              </div>
            </form>
            <hr />
            <div className="" style={{ marginTop: "1.5rem" }}>
              <h2>Danger Zone</h2>
              <p>
                Caution: This action is irreversible. All your conversations and
                profile data will be permanently deleted.
              </p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                onClick={() => alert("Are You Sure ?")}
                className="formFieldButton"
                style={{ backgroundColor: "Red" }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default General;
