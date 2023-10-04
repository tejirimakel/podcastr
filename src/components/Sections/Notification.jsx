import React, { Component } from "react";


class Notification extends Component {
  constructor() {
    super();

    this.state = {
      email: "timidakolo@gmail.com",
      newMsg: false,
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
          <div className="" style={{ marginTop: "5rem", marginBottom: "1rem" }}>
            <h1 className="font20 extraBold">Notification Email</h1>
            <p>
              Re-route your new message notifications to an alternative email
              address. Useful if you don’t check your account email address
              often.
            </p>
          </div>
          <div className="formCenter" style={{ marginTop: "2.5rem" }}>
            <form className="row g-3 ml-2 formFields" onSubmit={this.handleSubmit}>
              <div className="formField col-md-12">
                <label htmlFor="emailNotification" className="extraBold font18">
                  Email Notification
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter Notification Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-6 formField ">
                <button
                  type="submit"
                  onClick={(event) => (window.location.href = "notification")}
                  className="formFieldButton "
                >
                  Reset
                </button>
              </div>
              <div className="col-md-6 formField ">
                <button
                  type="submit"
                  onClick={(event) => (window.location.href = "notification")}
                  className="formFieldButton "
                >
                  Save
                </button>
              </div>
            </form>
            <hr />
            <div className="" style={{ marginTop: "1.5rem" }}>
              <h1 className="font20 extraBold">Notification Settings</h1>
              <p>
                Manage the messages you receive to your notification email
                address. We recommend keeping New Messages enabled so you know
                when you've got a match!
              </p>
            </div>
            <div>
              <p>New Messages</p>
              <div
                className="py-1"
                style={{ display: "flex", marginBottom: "0.25px" }}
              >
                <div className="mt-1">
                 
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                onClick={(event) => (window.location.href = "notification")}
                className="formFieldButton "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Notification;
