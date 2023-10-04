import React from "react";
import styled from "styled-components";

export default function FullButton({ title, action, border }) {
  return (
    <Wrapper
      className="animate pointer radius8 btn-outline"
      onClick={action ? () => action() : null}
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#000" : "#f0ae44")};
  background-color: ${(props) => (props.border ? "transparent" : "#f0ae44")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#000" : "#000")};
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#f0ae44")};
    border: 1px solid #f0ae44;
    color: ${(props) => (props.border ? "#f0ae44" : "#fff")};
  }
`;
