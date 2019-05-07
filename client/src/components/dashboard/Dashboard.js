import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';

import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import WithProfile from './WithProfile';
import WithoutProfile from './WithoutProfile';

const methods = {
  componentDidMount(props) {
    props.getCurrentProfile();
  }
};

const Dashboard = props => {
  const {profile, loading} = props.profile;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Dashboard</h1>
            {profile === null || loading ? <Spinner /> :
              Object.keys(profile).length > 0 ? <WithProfile profile={profile}/> :
                <WithoutProfile />}
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const marStateToProps = state => ({
  profile: state.profile
});

export default connect(marStateToProps, {getCurrentProfile})(lifecycle(methods)(Dashboard));