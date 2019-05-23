import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';

import { getProfiles } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';

const methods = {
  componentDidMount({getProfiles}) {
    getProfiles();
  }
};

const Profiles = ({profile}) => {
  const {profiles, loading} = profile;

  return (
    <div className="profiles">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">Browse and connect with developers</p>
            {profiles === null || loading ? <Spinner /> :
              profiles.length > 0 ? profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />) :
                <h4>No profiles found...</h4>}
          </div>
        </div>
      </div>
    </div>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(lifecycle(methods)(Profiles));
