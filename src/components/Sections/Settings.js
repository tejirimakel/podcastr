import React, { Component } from "react";
import {  Outlet } from "react-router-dom";
import Sidebar from "../Nav/Sidebar1";

class Settings extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <div className="">
          <Outlet />
        </div>
      </>
    );
  }
}

export default Settings;
