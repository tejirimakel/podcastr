import '../assets/css/DarkModeToggle.css';
import React, { useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';

//https://javascript.plainenglish.io/implementing-dark-mode-reactjs-2fba91cda7f2
export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleClick = () => {
    toggleDarkMode();
  };
  return (
    <div className="switch-toggle dark-mode-toggle">
      <label className="switch-check" id="button-check">
        <input
          type="checkbox"
          className="checkbox"
          checked={darkMode}
          onChange={handleClick}
        />
        <span className="switch-btn"></span>
        <span className="layer"></span>
      </label>
    </div>
  );
}
