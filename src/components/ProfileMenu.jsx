import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import ToolTipWrap from './ToolTipWrap';
import DarkModeToggle from './DarkModeToggle';
import { updateUserAuthState } from '../common/utils';
import { Dropdown } from 'react-bootstrap';
import '../assets/css/bs-dropdown.css';

export default function ProfileMenu(props) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log('ProfileMenu', user);

  const onLogout = () => {
    updateUserAuthState(null);
    dispatch(logout());
    // dispatch(reset());
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="ProfileMenuDropDown">
        <img src={user.dp} alt={user.name} width="40px" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="flex justify-center py-2 border-b">
          <ToolTipWrap tooltip="Toggle between dark and light mode">
            <DarkModeToggle />
          </ToolTipWrap>
        </div>
        <Dropdown.Item href="/profile/personal">
          Edit Personal Details
        </Dropdown.Item>
        <Dropdown.Item href="/profile/select">Switch User Type</Dropdown.Item>
        <Dropdown.Item href="/profile/details">
          Edit Profile Details
        </Dropdown.Item>
        <Dropdown.Item href="/my-shows">My Shows</Dropdown.Item>
        <Dropdown.Item href="/change-password">Change Password</Dropdown.Item>
        <Dropdown.Item href="/settings">Privacy Settings</Dropdown.Item>
        <span
          className="dropdown-item"
          onClick={() => {
            onLogout();
          }}
        >
          Logout
        </span>
      </Dropdown.Menu>
    </Dropdown>
  );
}
