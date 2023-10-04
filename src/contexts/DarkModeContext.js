import React, { createContext, useEffect, useState } from "react";
import App from "../App";

const DarkModeContext = createContext();

function DarkModeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  // Set to light mode by default
  let darkModeDefault = false;
  //   Check system/defice configured mode, and set default mode to that
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkModeDefault = true;
  }

  useEffect(() => {
    // Set default mode on refresh or page load base on system preference
    setDarkMode(darkModeDefault);
  }, [darkModeDefault]);

  // Listen for system light and dark mode preference changes and update our context
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (event.matches) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    });
  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <App />
      </DarkModeContext.Provider>
    </div>
  );
}

export { DarkModeContext, DarkModeProvider };
