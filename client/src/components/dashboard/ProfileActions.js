import React from 'react';
import { Link } from 'react-router-dom';
import { FaBlackTie, FaGraduationCap, FaUserCircle } from 'react-icons/fa';

import { clearErrors } from '../../actions/authActions';
import { connect } from 'react-redux';

const ProfileActions = ({errors, clearErrors}) => {
  const onClearErrors = () => {
    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
  };

  return (
    <div className="btn-group mb-4"
         role="group">
      <Link to="/edit-profile"
            className="btn btn-light"
            onClick={onClearErrors}>
        <FaUserCircle color="#0098E2" className="mr-2 mb-1" />
        Edit Profile
      </Link>
      <Link to="/add-experience"
            className="btn btn-light"
            onClick={onClearErrors}>
        <FaBlackTie color="#0098E2" className="mr-2 mb-1" />
        Add Experience
      </Link>
      <Link to="/add-education"
            className="btn btn-light"
            onClick={onClearErrors}>
        <FaGraduationCap color="#0098E2" className="mr-2 mb-1" />
        Add Education
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, {clearErrors})(ProfileActions);