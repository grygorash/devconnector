import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrors, logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

const AuthLinks = ({auth, errors, history, logoutUser, clearCurrentProfile, clearErrors}) => {
  const {avatar, name} = auth.user;

  const onLogoutClick = e => {
    e.preventDefault();
    clearCurrentProfile();
    logoutUser(history);
    if (Object.keys(errors).length > 0) {
      clearErrors(errors);
    }
  };

  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/feed"
              className="nav-link custom-btn mr-3">
          Posts Feed
        </Link>
      </li>
      <li className="nav-item">
        <img className="user-avatar"
             src={avatar}
             alt={name} />
        <button className="nav-link custom-btn"
                onClick={onLogoutClick}>Sign out
        </button>
      </li>
    </ul>
  );
};

AuthLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile, clearErrors})(withRouter(AuthLinks));