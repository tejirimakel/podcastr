import '../assets/css/DarkModeToggle.css';
import React from 'react';
import { current_time_milliseconds } from '../common/utils';

export default function ToggleSwitch(props) {
  const {
    id = 'ToggleSwitch' + current_time_milliseconds(),
    checked = false,
    disabled = false,
    changeCallback = (inp) => {
      console.log(inp.checked);
    },
  } = props;
  const handleClick = (e) => {
    changeCallback(e.target);
  };
  return (
    <div className="switch-toggle toggle-switch" disabled={disabled}>
      <label className="switch-check" htmlFor={id}>
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleClick}
          checked={checked}
          id={id}
          disabled={disabled}
        />
        <span className="switch-btn"></span>
        <span className="layer"></span>
      </label>
    </div>
  );
}
