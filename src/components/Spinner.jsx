import '../assets/css/Spinner.css';
import React from 'react';

function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner">
        <div className="loadingSpinnerContainer">
          <div className="loadingSpinner"></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
