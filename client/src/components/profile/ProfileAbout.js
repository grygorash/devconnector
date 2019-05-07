import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';

import isEmpty from '../../validation/is-empty';

const ProfileAbout = ({profile}) => {
  const firstName = profile.user.name.trim().split(' ')[0];

  return (
    <div className="card card-body bg-light mb-3">
      {!isEmpty(profile.bio) && <div>
        <h3 className="text-center text-info">{firstName}'s Bio</h3>
        <p className="lead text-center">{profile.bio}</p>
        <hr />
      </div>}
      <h3 className="text-center text-info">Skill Set</h3>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {profile.skills
          .map(
            (skill, i) =>
              <div key={i}
                   className="p-3">
                <FaCheck className="mr-2" />
                {skill}
              </div>)}
      </div>
    </div>
  );
};
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;