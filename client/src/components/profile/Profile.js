import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { getProfileByHandle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';

class Profile extends PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
  };

  // -------------------------
  // @TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && !nextProps.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.profile.profile === null && !props.profile.loading) {
  //     props.history.push('/not-found');
  //   }
  //   return null;
  // }
  // ----------------------------


  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const {profile, loading} = this.props.profile;

    return (
      <div className="profile-view">
        {profile === null || loading ? <Spinner /> :
          <div className="row">
            <div className="col-md-12">
              <Link to="/profiles"
                    className="btn btn-light mb-3 float-left">Back To Profiles</Link>
            </div>
            <div className="col-md-12">
              <ProfileHeader profile={profile} />
              <ProfileAbout profile={profile} />
              <ProfileCreds experience={profile.experience}
                            education={profile.education} />
              {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
            </div>
          </div>
        }
      </div>
    );
  }
}

const marStateToProps = state => ({
  profile: state.profile
});

export default connect(marStateToProps, {getProfileByHandle})(withRouter(Profile));