import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteAccount } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

const WithProfile = ({profile, errors, deleteAccount, clearErrors}) => {
  const {experience, education, handle} = profile;

  const onDeleteClick = () => {
    deleteAccount();
    if (Object.keys(errors).length > 0) {
      clearErrors(errors);
    }
  };

  return (
    <div>
      <p className="lead text-muted">
        Welcome, <Link to={`/profile/${handle}`}>{handle}</Link>
      </p>
      <ProfileActions />
      {experience.length ? <Experience experience={experience} /> : null}
      {education.length ? <Education education={education} /> : null}
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
  errors: state.errors
});

export default connect(marStateToProps, {deleteAccount, clearErrors})(WithProfile);