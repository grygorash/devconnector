import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const WithoutProfile = props => {
  const {user} = props.auth;

  return (
    <div className="text-center">
      <p className="lead text-muted">Welcome, {user.name}</p>
      <p>You have not yet setup profile, please add some info</p>
      <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
    </div>
  );
};

WithoutProfile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(WithoutProfile);