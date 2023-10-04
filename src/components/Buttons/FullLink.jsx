import React from "react";
import styled from "styled-components";

export default function FullLink({ title, href, border }) {
  return (
    <Wrapper
      className="animate pointer radius8 fulllink"
      href={href ? href : '#'}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.a`
  border: 1px solid ${(props) => (props.border ? "#000" : "#f0ae44")};
  background-color: ${(props) => (props.border ? "transparent" : "#f0ae44")};
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 15px;
  outline: none;
  color: #000;
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#f0ae44")};
    border: 1px solid #f0ae44;
    color: ${(props) => (props.border ? "#f0ae44" : "#fff")};
  }
`;
