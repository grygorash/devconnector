import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteAccount } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

const WithProfile = props => {
  const {profile} = props.profile;

  const onDeleteClick = () => {
    props.deleteAccount();
    if (Object.keys(props.errors).length > 0) {
      props.clearErrors(props.errors);
    }
  };

  return (
    <div>
      <p className="lead text-muted">
        Welcome, <Link to={`/profile/${profile.handle}`}>{profile.handle}</Link>
      </p>
      <ProfileActions />
      {profile.experience.length ? <Experience /> : null}
      {profile.education.length ? <Education /> : null}
      <div style={{marginTop: '60px'}}>
        <button onClick={onDeleteClick} className="btn btn-danger">Delete My Account</button>
      </div>
    </div>
  );
};

WithProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const marStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(marStateToProps, {deleteAccount, clearErrors})(WithProfile);