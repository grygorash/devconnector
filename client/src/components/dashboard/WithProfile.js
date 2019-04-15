import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteAccount } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import ProfileActions from './ProfileActions';

const WithProfile = props => {
  const {profile} = props.profile;
  const {user} = props.auth;

  const onDeleteClick = () => {
    props.deleteAccount();
    if (Object.keys(props.errors).length > 0) {
      props.clearErrors(props.errors);
    }
  };

  return (
    <div>
      <p className="lead text-muted">
        Welcome, <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
      </p>
      <ProfileActions />
      {/*TODO: exp and edu*/}
      <div style={{marginTop: '60px'}}>
        <button onClick={onDeleteClick} className="btn btn-danger">Delete My Account</button>
      </div>
    </div>
  );
};

WithProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const marStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(marStateToProps, {deleteAccount, clearErrors})(WithProfile);