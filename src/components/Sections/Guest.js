import React, { Component } from "react";
import axios from "axios";

class Guest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      value: "",
      interest: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
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
    alert("A text was submitted: " + this.state.value);
    event.preventDefault();
  }

  onFileChange(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);

    axios.post("api/uploadfile", formData);
  };

  render() {
    return (
      <>
        <div className="App" style={{ backgroundColor: "#12130f" }}>
          <div
            className="container"
            style={{ width: "85%", marginBottom: "5rem" }}
          >
            <div
              className="textCenter"
              style={{ marginTop: "5rem", marginBottom: "1.5rem" }}
            >
              <h1>Create a Guest Profile</h1>
              <p>More about you</p>
            </div>
            <div style={{ marginLeft: "3rem" }}>
              <div className="row textCenter" style={{ marginBottom: "1.5rem" }}>
                <div className="col-md-6">
                  <h3 style={{ marginBottom: "1rem" }}>Profile Image</h3>
                  <input
                    type="file"
                    onChange={this.onFileChange}
                    className="custom-file-input"
                  />
                  <br />
                  <br />
                  <button
                    onClick={this.onFileUpload}
                    className="formFieldButton"
                    type="submit"
                    name="upload"
                  >
                    upload
                  </button>
                  <br />
                  <br />
                </div>
                <div className="col-md-6 mb-2">
                  <h3>Profile Video</h3>
                  <div
                    className="card"
                    style={{ maxWidth: "80%", marginLeft: "2rem" }}
                  >
                    <div className="icon">
                      <i className="bi bi-person-rolodex md-36"></i>
                    </div>
                    <p className="">
                      Stand out with a profile video.
                      <br />
                      Available with AAP Pro.
                    </p>
                  </div>
                </div>
                <div className="col-md-12" style={{ marginRight: "2.5rem" }}>
                  <h3>Profile Headline</h3>
                  <p className="mb-1">
                    This is your quick elevator pitch, a chance to stand out.
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    <textarea
                      cols="30"
                      rows="5"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </form>
                </div>
                <div
                  className="col-md-12 mt-1"
                  style={{ marginRight: "2.5rem" }}
                >
                  <h3>About Me</h3>
                  <p className="mb-1">
                    Tell Podcasters about yourself, your experience and the
                    value you can bring to a conversation.
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    <textarea
                      cols="30"
                      rows="5"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </form>
                </div>
                <div
                  className="col-md-12 mt-1"
                  style={{ marginRight: "2.5rem" }}
                >
                  <h3>Interest</h3>
                  <p className="mb-1">
                    What areas would you like to talk about? These a primary
                    match-making attributes!
                  </p>
                  <div
                    className="col-md-12 formField"
                    style={{ marginLeft: "2.5rem" }}
                  >
                    <select
                      name="interest"
                      value={this.state.interest}
                      onChange={this.handleChange}
                      id="inputInterest"
                      className="formFieldInput"
                    >
                      <option selected>Choose...</option>
                      <option>Arts</option>
                      <option>Books</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginLeft: "2.5rem" }}>
                <div className="col-md-3 formField ">
                  <button
                    onClick={(event) =>
                      (window.location.href = "/profile/select")
                    }
                    className="formFieldButton "
                  >
                    Back
                  </button>
                </div>
                <div className="col-md-3 formField ">
                  <button
                    onClick={(event) =>
                      (window.location.href = "/podcast/guest")
                    }
                    className="formFieldButton "
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Guest;
