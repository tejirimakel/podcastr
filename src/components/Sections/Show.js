import React, { Component } from "react";

class Show extends Component {
  constructor() {
    super();

    this.state = {
      search: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <>
        <div className="App" style={{ backgroundColor: "#12130f" }}>
          <div className="container" style={{ width: "90%" }}>
            <div className="row">
              <div className="col-md-6">
                <div className="sideImg" />
              </div>
              <div className="col-md-6">
                <div className="" style={{ marginTop: "5rem" }}>
                  <h1>Create a Show Profile</h1>
                  <p>
                    Search for your show to automatically populate your profile.
                    You can edit this information later.
                  </p>
                </div>
                <form style={{ padding: "20px 0px 5px 0px" }}>
                  <div className="col-md-12 formField">
                    <input
                      type="text"
                      className="formFieldInput"
                      placeholder="Search"
                      name="search"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                  </div>
                </form>
                <p style={{ paddingBottom: "1.5rem" }}>
                  When your show is added a confirmation email will be sent to
                  the address within your feed.
                </p>
                <p>
                  If you know your podcast's feed URL, you can enter this
                  manually instead.
                  <br />
                  Enter show information manually instead
                </p>
                <div
                  className="col-12 formField"
                  style={{ paddingTop: "1.5rem" }}
                >
                  <button
                    type=""
                    onClick={() => alert("imported")}
                    className="formFieldButton "
                  >
                    Import
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

export default Show;
