import React from 'react';
import { current_time_milliseconds } from '../common/utils';
import styled from 'styled-components';

export default function FormProOnlyUpgrade(props) {
  const {
    id = 'FormProOnlyUpgrade' + current_time_milliseconds(),
    onClick = (inp) => {
      console.log(inp.checked);
    },
  } = props;

  const handleClick = (e) => {
    onClick(e.target);
  };
  return (
    <ProSmall id={id} onClick={handleClick} className="text-primary">
      <i className="bi bi-award-fill"></i> Unlock - Upgrade to Pro
    </ProSmall>
  );
}

const ProSmall = styled.small`
  width: 100%;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #f0ae44;
  :hover {
    color: #9c6104;
  }
`;
