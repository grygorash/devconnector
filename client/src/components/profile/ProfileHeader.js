import React from 'react';
import PropTypes from 'prop-types';
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

import isEmpty from '../../validation/is-empty';

const ProfileHeader = ({profile}) =>
  <div className="card card-body bg-info text-white mb-3">
    <div className="row">
      <div className="col-4 col-md-3 m-auto">
        <img className="rounded-circle" src={profile.user.avatar}
             alt="" />
      </div>
    </div>
    <div className="text-center">
      <h1 className="display-4 text-center">{profile.handle}</h1>
      <p className="lead text-center">{profile.status} {!isEmpty(profile.company) && `at ${profile.company}`}</p>
      {!isEmpty(profile.location) && <p>{profile.location}</p>}
      <p>
        {!isEmpty(profile.website) ?
          <a className="text-white p-2"
             rel="noopener noreferrer"
             target="_blank"
             href={profile.website}>
            <FaGlobe size="2em" />
          </a> :
          null}
        {!isEmpty(profile.social.facebook) ?
          <a className="text-white p-2"
             rel="noopener noreferrer"
             target="_blank"
             href={profile.social.facebook}>
            <FaFacebook size="2em" />
          </a> :
          null}
        {!isEmpty(profile.social.linkedin) ?
          <a className="text-white p-2"
             rel="noopener noreferrer"
             target="_blank"
             href={profile.social.linkedin}>
            <FaLinkedin size="2em" />
          </a> :
          null}
        {!isEmpty(profile.social.twitter) ?
          <a className="text-white p-2"
             rel="noopener noreferrer"
             target="_blank"
             href={profile.social.twitter}>
            <FaTwitter size="2em" />
          </a> :
          null}
        {!isEmpty(profile.social.instagram) ?
          <a className="text-white p-2"
             rel="noopener noreferrer"
             target="_blank"
             href={profile.social.instagram}>
            <FaInstagram size="2em" />
          </a> :
          null}
        {!isEmpty(profile.social.youtube) ?
          <a className="text-white p-2"
             rel="noopener noreferrer"
             target="_blank"
             href={profile.social.youtube}>
            <FaYoutube size="2em" />
          </a> :
          null}
      </p>
    </div>
  </div>;

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;