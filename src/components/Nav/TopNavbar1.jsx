import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileMenu from '../ProfileMenu';
import MenuIconLi from '../MenuIconLi';
import { updateUserAuthState } from '../../common/utils';

import Sidebar from '../Nav/Sidebar';
import Backdrop from '../Elements/Backdrop';

import BurgerIcon from '../../assets/svg/BurgerIcon';
import APVAMatchLogo from '../../assets/img/APVA-Match.png';

export default function TopNavbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    updateUserAuthState(null);
    navigate('/');
  };

  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setY(window.scrollY));
    return () => {
      window.removeEventListener('scroll', () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate whiteBg"
        style={y > 100 ? { height: '60px' } : { height: '80px' }}
      >
        <NavInner className="container flexSpaceCenter">
          <NavLink className="pointer flexNullCenter" to="/home" smooth="true">
            <img
              src={APVAMatchLogo}
              alt=""
              style={{ marginLeft: '15px' }}
              width="100px"
            />
          </NavLink>
          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <NavLink
                offset={-80}
                activeclass="actived"
                style={{ padding: '10px 15px' }}
                to="/find-guest"
              >
                Find Guest
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                offset={-80}
                activeclass="actived"
                style={{ padding: '10px 15px' }}
                to="/find-show"
              >
                Find Show
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                offset={-80}
                activeclass="actived"
                style={{ padding: '10px 15px' }}
                to="https://academy.apvamatch.org"
              >
                APVA Academy
              </NavLink>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
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
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;
