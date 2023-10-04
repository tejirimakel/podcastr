import React, { Component } from "react";

class Plan extends Component {
  render() {
    return (
      <>
        <div
          className="container"
          style={{ width: "70%", marginRight: "1.5px", height: "100vh" }}
        >
          <div className="" style={{ marginTop: "5rem", marginBottom: "1rem" }}>
            <h1 className="extraBold font25">Subscription</h1>
            <p>
              Plan: <b>Free</b>
            </p>
            <br />
            <p>
              As a free plan user, you are able to start a limited number of
              conversations per month.
              <br />
              Your limit will reset on 16th Jun 2022.
              <br />
              Remove the limit and get access to more features by upgrading to
              Pro.
            </p>
          </div>
          <div className="mt-4 mb-2">
            <button
              type="submit"
              onClick={(event) => (window.location.href = "plan")}
              className="formFieldButton "
            >
              Upgrade
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Plan;
