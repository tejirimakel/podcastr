import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Nav/Sidebar3';

class Inbox extends Component {
  render() {
    return (
      <>
        <Sidebar />
        <Outlet />
      </>
    );
  }
}

export default Inbox;
