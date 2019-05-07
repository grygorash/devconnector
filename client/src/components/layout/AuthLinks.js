import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { clearErrors, logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

const AuthLinks = (props) => {
  const {user} = props.auth;

  const onLogoutClick = e => {
    e.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser(props.history);
    if (Object.keys(props.errors).length > 0) {
      props.clearErrors(props.errors);
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
             src={user.avatar}
             alt={user.name} />
        <button className="nav-link custom-btn"
                onClick={onLogoutClick}>Sign out
        </button>
      </li>
    </ul>
  );
};

AuthLinks.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const marStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(marStateToProps, {logoutUser, clearCurrentProfile, clearErrors})(withRouter(AuthLinks));