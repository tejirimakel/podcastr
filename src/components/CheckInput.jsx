import '../assets/css/CheckInput.css';
import React, { useState } from 'react';
import { current_time_milliseconds } from '../common/utils';

export default function CheckInput(props) {
  const defId = 'CheckInput' + current_time_milliseconds();
  const {
    id = defId,
    name = defId,
    checked = false,
    label = '',
    disabled = false,
    changeCallback = (inp) => {
      console.log(inp.checked);
    },
  } = props;
  // const [isChecked, doCheck] = useState(checked);

  const handleClick = (e) => {
    if (!disabled) {
      // doCheck(e.target.checked);
      changeCallback(e.target);
    }
  };
  const wClasses = 'flex items-center ccb' + (checked ? ' selected' : '');
  return (
    <label className={wClasses} disabled={disabled}>
      <input
        type="checkbox"
        name={name}
        onChange={handleClick}
        checked={checked}
        id={id}
        disabled={disabled}
      />
      <span className="checkmark"></span>
      <span className="ml-2">{label}</span>
    </label>
  );
}
