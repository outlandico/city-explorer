// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ErrorAlert({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      An error occurred: {error.message}
    </div>
  );
}

ErrorAlert.propTypes = {
  error: PropTypes.object.isRequired // Assuming error is an object
  
};

export default ErrorAlert;
