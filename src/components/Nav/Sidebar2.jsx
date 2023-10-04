import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// Assets
import CloseIcon from '../../assets/svg/CloseIcon';

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  return (
    <Wrapper className="animate sidebar darkBg" sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <h1 className="whiteColor font20" style={{ marginLeft: '15px' }}>
            PODCAST
          </h1>
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
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeclass="actived"
            className="whiteColor"
            style={{ padding: '10px 15px' }}
            to="/"
            spy="true"
            smooth="true"
            offset={-60}
          >
            Home
          </NavLink>
        </li>
        <li className="semiBold font15 pointer">
          <NavLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            className={(isActive) =>
              'whiteColor' + (!isActive ? 'actived' : '')
            }
            style={{ padding: '10px 15px' }}
            to="/Blog"
            spy="true"
            smooth="true"
            offset={-60}
          >
            Blog
          </NavLink>
        </li>
        <li className="semiBold font15 pointer">
          <NavLink
            onClick={() => toggleSidebar(!sidebarOpen)}
            className={(isActive) =>
              ' whiteColor' + (!isActive ? 'actived' : '')
            }
            style={{ padding: '10px 15px' }}
            to="/Contact"
            spy="true"
            smooth="true"
            offset={-60}
          >
            Contact Us
          </NavLink>
        </li>
      </UlStyle>
      <UlStyle className="flexSpaceCenter">
        <li className="semiBold font15 pointer">
          <NavLink
            to="/login"
            style={{ padding: '10px 15px' }}
            className="textCenter radius8 lightBg"
          >
            Log in
          </NavLink>
        </li>
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
