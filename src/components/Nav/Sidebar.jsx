import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { updateUserAuthState } from '../../common/utils';
// Assets
import CloseIcon from '../../assets/svg/CloseIcon';
import ProfileMenu from '../ProfileMenu';
import MenuIconLi from '../MenuIconLi';
import APVAMatchLogo from '../../assets/img/APVA-Match.png';

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    updateUserAuthState(null);
    navigate('/');
  };

  return (
    <Wrapper className="animate sidebar darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <img
            src={APVAMatchLogo}
            alt=""
            style={{ marginLeft: '15px' }}
            width="100px"
          />
        </div>
        <CloseBtn
          onClick={() => toggleSidebar(!sidebarOpen)}
          className="animate pointer"
        >
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        <li className="semiBold font15 pointer">
          <NavLink
            offset={-60}
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeclass="actived"
            className="whiteColor"
            style={{ padding: '10px 15px' }}
            to="/find-guest"
          >
            Find Guest
          </NavLink>
        </li>
        <li className="semiBold font15 pointer">
          <NavLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeclass="actived"
            className="whiteColor"
            style={{ padding: '10px 15px' }}
            offset={-60}
            to="/find-show"
          >
            Find Show
          </NavLink>
        </li>
        <li className="semiBold font15 pointer">
          <NavLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeclass="actived"
            className="whiteColor"
            style={{ padding: '10px 15px' }}
            offset={-60}
            to="https://academy.apvamatch.org"
          >
            APVA Academy
          </NavLink>
        </li>
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        {user ? (
          <>
            <MenuIconLi tooltip="Message Inbox" to="/messages">
              <i className="bi bi-chat-left-text"></i>
            </MenuIconLi>
            <MenuIconLi tooltip="My bookings" to="/bookings">
              <i className="bi bi-calendar-month"></i>
            </MenuIconLi>
            <MenuIconLi tooltip="Favourites" to="/favourtites">
              <i className="bi bi-heart"></i>
            </MenuIconLi>
            <MenuIconLi tooltip="My Profile Views" to="/profile/views">
              <i className="bi bi-eye"></i>
            </MenuIconLi>
            <MenuIconLi
              tooltip="What's News"
              clickCallback={(e) => {
                e.preventDefault();
                console.log('Here');
              }}
            >
              <i className="bi bi-info-circle"></i>
            </MenuIconLi>
            <li className="semiBold font15 pointer flexCenter">
              <ProfileMenu
                className="radius8 whiteColor blueBg onHover flex gap-1"
                style={{ padding: '7px 30px' }}
                onClick={onLogout}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className="radius8 whiteColor blueBg onHover flex gap-1"
                style={{ padding: '7px 30px' }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className="radius8 whiteColor blueBg onHover flex gap-1"
                style={{ padding: '7px 30px' }}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </UlStyle>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.sidebarOpen ? '0px' : '-400px')};
  z-index: 9999;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
const SidebarHeader = styled.div`
  padding: 20px 0;
`;
const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;
const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
