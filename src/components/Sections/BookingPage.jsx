import React, { Component } from "react";

class BookingPage extends Component {
  render() {
    return (
      <>
        <div className="App my-4" style={{ backgroundColor: "#12130f" }}>
          <div className="container" style={{ width: "100%" }}>
            <div
              className=""
              style={{
                marginTop: "5rem",
                marginBottom: "5rem",
                borderRadius: "20px",
                backgroundColor: "#757575",
                padding: "3rem",
              }}
            >
              <div style={{ marginBottom: "2rem" }}>
                <h1 className="textCenter">You don't have any bookings yet</h1>
                <p className="textCenter">
                  Start booking your meetings, chats and recordings, directly
                  from your messages.
                </p>
              </div>
              <div className="row ml-1">
                <div className="col-md-4 textCenter">
                  <i className="bi bi-person-rolodex md-36"></i>
                  <h3 className="">Update your timezone and availability</h3>
                  <p className="textCenter">
                    The default is set to Mon - Fri, 9am - 5pm.
                  </p>
                  <div className="my-4">
                    <button
                      className="text formFieldButton"
                      onClick={(event) =>
                        (window.location.href = "/settings/general")
                      }
                    >
                      Go to Settings
                    </button>
                  </div>
                </div>
                <div className="col-md-4 textCenter">
                  <i className="bi bi-person-rolodex md-36"></i>
                  <h3 className="">
                    Send an invite directly from your messages
                  </h3>
                  <p className="textCenter">create a booking link.</p>
                  <div className="my-4">
                    <button
                      className="text formFieldButton"
                      onClick={(event) => (window.location.href = "/inbox/all")}
                    >
                      Go to Messages
                    </button>
                  </div>
                </div>
                <div className="col-md-4 textCenter">
                  <i className="bi bi-person-rolodex md-36"></i>
                  <h3 className="">Get Booked!</h3>
                  <p className="textCenter">
                    The recipient will then pick a date and time that works for
                    you both and you’ll be notified on the progress. Easy Peasy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BookingPage;
