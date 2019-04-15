import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import Spinner from '../common/Spinner';

class CreateEditProfile extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {},
  };

  componentDidMount() {
    this.props.getCurrentProfile();
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors(this.props.errors);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }

    if (nextProps.profile.profile &&
      Object.keys(nextProps.profile.profile).length > 0 &&
      nextProps.location.pathname === '/create-profile') {
      nextProps.history.push('/edit-profile');
    }

    if (nextProps.profile.profile) {
      const {profile} = nextProps.profile;
      // Set component field state
      this.setState({
                      handle: profile.handle ? profile.handle : '',
                      company: profile.company ? profile.company : '',
                      website: profile.website ? profile.website : '',
                      location: profile.location ? profile.location : '',
                      status: profile.status ? profile.status : '',
                      skills: profile.skills ? profile.skills.join(',') : '',
                      githubusername: profile.githubusername ? profile.githubusername : '',
                      bio: profile.bio ? profile.bio : '',
                      twitter: profile.social && profile.social.twitter ? profile.social.twitter : '',
                      facebook: profile.social && profile.social.facebook ? profile.social.facebook : '',
                      linkedin: profile.social && profile.social.linkedin ? profile.social.linkedin : '',
                      youtube: profile.social && profile.social.youtube ? profile.social.youtube : '',
                      instagram: profile.social && profile.social.instagram ? profile.social.instagram : '',
                    });
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.errors !== prevState.errors) {
  //     return {
  //       errors: nextProps.errors
  //     };
  //   }
  //
  //   if (nextProps.profile.profile && Object.keys(nextProps.profile.profile).length > 0 &&
  //     nextProps.location.pathname === '/create-profile') {
  //     nextProps.history.push('/edit-profile');
  //   }
  //
  //   if (nextProps.profile.profile) {
  //     const {profile} = nextProps.profile;
  //     // Set component fields state
  //     const state = {
  //       handle: profile.handle,
  //       company: profile.company,
  //       website: profile.website,
  //       location: profile.location,
  //       status: profile.status,
  //       skills: profile.skills.join(','),
  //       githubUsername: profile.githubusername,
  //       bio: profile.bio,
  //       twitter: profile.social.twitter,
  //       facebook: profile.social.facebook,
  //       linkedin: profile.social.linkedin,
  //       youtube: profile.social.youtube,
  //       instagram: profile.social.instagram
  //     };
  //     console.log('--->', prevState.profile);
  //     if (prevState.profile === state) {
  //       return state;
  //     }
  //   }
  //   return null;
  // }

  onSubmit = e => {
    e.preventDefault();
    this.props.createProfile({
                               handle: this.state.handle,
                               company: this.state.company,
                               website: this.state.website,
                               location: this.state.location,
                               status: this.state.status,
                               skills: this.state.skills,
                               githubusername: this.state.githubusername,
                               bio: this.state.bio,
                               twitter: this.state.twitter,
                               facebook: this.state.facebook,
                               linkedin: this.state.linkedin,
                               youtube: this.state.youtube,
                               instagram: this.state.instagram
                             }, this.props.history);
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  setSocialInputs = () => {
    this.setState({displaySocialInputs: !this.state.displaySocialInputs});
  };

  render() {
    const {
      displaySocialInputs,
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram,
      errors
    } = this.state;
    const {profile} = this.props.profile;
    const {history} = this.props;
    const {onSubmit, onChange, setSocialInputs} = this;

    // Select options for status
    const options = [
      {label: '* Select Professional Status', value: 0},
      {label: 'Junior Developer', value: 'Junior Developer'},
      {label: 'Middle Developer', value: 'Middle Developer'},
      {label: 'Senior Developer', value: 'Senior Developer'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Student or Learning', value: 'Student or Learning'},
      {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Other', value: 'Other'},
    ];

    return (
      <div className="create-profile">
        {profile ?
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">{profile && Object.keys(profile).length > 0 ? 'Edit Profile' :
                  'Create Your Profile'}</h1>
                {profile && Object.keys(profile).length > 0 ? null :
                  <p className="lead text-center">Let's get some information to make your profile stand out</p>}
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={onSubmit}>
                  <TextFieldGroup placeholder="* Profile Handle"
                                  name="handle"
                                  value={handle}
                                  onChange={onChange}
                                  error={errors.handle}
                                  info="A unique handle for your profile URL. Your full name, company name, nickname" />
                  <SelectListGroup placeholder="Status"
                                   name="status"
                                   value={status}
                                   onChange={onChange}
                                   error={errors.status}
                                   options={options}
                                   info="Give us an idea where you are at in your career" />
                  <TextFieldGroup placeholder="Company"
                                  name="company"
                                  value={company}
                                  onChange={onChange}
                                  error={errors.company}
                                  info="Could be your own company or one you work for" />
                  <TextFieldGroup placeholder="Website"
                                  name="website"
                                  value={website}
                                  onChange={onChange}
                                  error={errors.website}
                                  info="Could be your own website or a company one" />
                  <TextFieldGroup placeholder="Location"
                                  name="location"
                                  value={location}
                                  onChange={onChange}
                                  error={errors.location}
                                  info="The city in which you live" />
                  <TextFieldGroup placeholder="* Skills"
                                  name="skills"
                                  value={skills}
                                  onChange={onChange}
                                  error={errors.skills}
                                  info="Please, use comma separated values" />
                  <TextFieldGroup placeholder="Github Username"
                                  name="githubusername"
                                  value={githubusername}
                                  onChange={onChange}
                                  error={errors.githubusername}
                                  info="If you want your latest repos and a Github link, include your username" />
                  <TextAreaFieldGroup placeholder="Short Bio"
                                      name="bio"
                                      value={bio}
                                      onChange={onChange}
                                      error={errors.bio}
                                      info="Tell us a little about yourself" />
                  <div className="mb-3">
                    <button type="button"
                            className="btn btn-light"
                            onClick={setSocialInputs}>
                      Add Social Network Links
                    </button>
                    <span className="text-muted ml-3">Optional</span>
                    {displaySocialInputs &&
                    <div className="mt-3">
                      <InputGroup placeholder="Twitter profile URL"
                                  name="twitter"
                                  icon={<FaTwitter />}
                                  value={twitter}
                                  onChange={onChange}
                                  error={errors.twitter} />
                      <InputGroup placeholder="Facebook profile URL"
                                  name="facebook"
                                  icon={<FaFacebook />}
                                  value={facebook}
                                  onChange={onChange}
                                  error={errors.facebook} />
                      <InputGroup placeholder="LinkedIn profile URL"
                                  name="linkedin"
                                  icon={<FaLinkedin />}
                                  value={linkedin}
                                  onChange={onChange}
                                  error={errors.linkedin} />
                      <InputGroup placeholder="Youtube profile URL"
                                  name="youtube"
                                  icon={<FaYoutube />}
                                  value={youtube}
                                  onChange={onChange}
                                  error={errors.youtube} />
                      <InputGroup placeholder="Instagram profile URL"
                                  name="instagram"
                                  icon={<FaInstagram />}
                                  value={instagram}
                                  onChange={onChange}
                                  error={errors.instagram} />
                    </div>}
                  </div>
                  <button type="submit"
                          className="btn btn-lg btn-info mr-2 w-25">
                    {profile && Object.keys(profile).length > 0 ? 'Save' : 'Submit'}
                  </button>
                  <button type="button"
                          className="btn btn-lg btn-danger w-25"
                          onClick={history.goBack}>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div> :
          <Spinner />}
      </div>
    );
  }
}

const marStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(marStateToProps, {createProfile, getCurrentProfile, clearErrors})(withRouter(CreateEditProfile));