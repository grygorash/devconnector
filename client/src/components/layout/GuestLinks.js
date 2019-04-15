import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearErrors } from '../../actions/authActions';

const GuestLinks = props => {
  const onClearErrors = () => {
    if (Object.keys(props.errors).length > 0) {
      props.clearErrors(props.errors);
    }
  };

  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register" onClick={onClearErrors}>Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login" onClick={onClearErrors}>Sign In</Link>
      </li>
    </ul>
  );
};

GuestLinks.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {clearErrors})(GuestLinks);