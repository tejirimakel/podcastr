import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

import Sidebar from '../Nav/Sidebar2';
import Backdrop from '../Elements/Backdrop';

import BurgerIcon from '../../assets/svg/BurgerIcon';
import { NavLink } from 'react-router-dom';
import APVAMatchLogo from '../../assets/img/APVA-Match.png';

export default function TopNavbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
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
          <NavLink className="pointer flexNullCenter" to="/">
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
              <NavLink style={{ padding: '10px 15px' }} to="/" offset={-80}>
                Home
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                // activeclassName="actived"
                style={{ padding: '10px 15px' }}
                to="/blog"
                offset={-80}
              >
                Blog
              </NavLink>
            </li>
            <li className="semiBold font15 pointer">
              <NavLink
                className={(isActive) => '' + (!isActive ? ' actived' : '')}
                style={{ padding: '10px 15px' }}
                to="/contact"
                offset={-80}
              >
                Contact Us
              </NavLink>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            {props.current_slug === '/login' ? (
              <li>
                <NavLink
                  to="/register"
                  className="radius8 whiteColor blueBg onHover flex gap-1"
                  style={{ padding: '7px 30px' }}
                >
                  Register
                </NavLink>
              </li>
            ) : (
              <>
                {user ? (
                  <li className="semiBold font15 pointer flexCenter">
                    <button
                      className="radius8 whiteColor blueBg onHover flex gap-1"
                      style={{ padding: '7px 30px' }}
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </li>
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
                  </>
                )}
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
