import React, { Component } from "react";

class Unread extends Component {
  render() {
    return (
      <>
        <div
          className="" style={{height:"65vh"}}
                  >
                    <div
                      className="container"
                      style={{ width: "70%", marginRight: "0.3px" }}
                    >
            <div
              className="greyBg"
              style={{
                marginTop: "5rem",
                marginBottom: "5rem",
                borderRadius: "20px",
                padding: "3rem",
              }}
            >
              <h1 className="textCenter">Inbox Coming up</h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Unread;
