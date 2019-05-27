import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { clearErrors } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import Spinner from '../common/Spinner';

class CreateEditProfile extends PureComponent {
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
    instagram: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.profile.profile &&
      Object.keys(nextProps.profile.profile).length > 0 &&
      nextProps.location.pathname === '/create-profile') {
      nextProps.history.push('/edit-profile');
    }

    if (nextProps.profile.profile && nextProps.profile.profile._id !== prevState.id) {
      const {_id, handle, company, website, location, status, skills, githubusername, bio, social} = nextProps.profile.profile;

      // Set component field state
      return {
        id: _id,
        handle: handle ? handle : '',
        company: company ? company : '',
        website: website ? website : '',
        location: location ? location : '',
        status: status ? status : '',
        skills: skills ? skills.join(',') : '',
        githubusername: githubusername ? githubusername : '',
        bio: bio ? bio : '',
        twitter: social && social.twitter ? social.twitter : '',
        facebook: social && social.facebook ? social.facebook : '',
        linkedin: social && social.linkedin ? social.linkedin : '',
        youtube: social && social.youtube ? social.youtube : '',
        instagram: social && social.instagram ? social.instagram : '',
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.getCurrentProfile();
    if (Object.keys(this.props.errors).length > 0) {
      this.props.clearErrors(this.props.errors);
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const {handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram} = this.state;
    const {history, createProfile} = this.props;

    createProfile({handle, company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram}, history);
  };

  onChange = ({target}) => {
    this.setState({[target.name]: target.value});
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
      instagram
    } = this.state;
    const {profile} = this.props.profile;
    const {history, errors} = this.props;
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
                <Link to="/dashboard" className="btn btn-light">Go Back</Link>
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

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {createProfile, getCurrentProfile, clearErrors})(withRouter(CreateEditProfile));