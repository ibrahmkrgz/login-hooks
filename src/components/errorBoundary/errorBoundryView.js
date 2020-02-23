import React from 'react';
import PropTypes from 'prop-types';
import './errorBoundryStyles.scss';

const EdgeCase = ({ status }) => (
  <div className="error-boundry">
    <img
      alt="not-found"
      className="error-boundry-image"
      src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
    />
    <span className="error-boundry-message">{status}</span>
    <span className="error-boundry-message">
      Something went wrong. Please contact with ibrahm.krgz@gmail.com
    </span>
  </div>
);

EdgeCase.propTypes = {
  status: PropTypes.string.isRequired,
};
export default EdgeCase;
