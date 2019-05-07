import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import isEmpty from '../../validation/is-empty';

const ProfileCreds = ({experience, education}) =>
  <div className="row">
    {!isEmpty(experience) &&
    <div className="col-md-6">
      <h3 className="text-center text-info">Experience</h3>
      <ul className="list-group">
        {experience
          .map(
            exp =>
              <li key={exp._id}
                  className="list-group-item">
                <h4>{exp.company}</h4>
                <p>
                  <Moment format="MMM Do YYYY" date={exp.from} /> - {!isEmpty(exp.to) ?
                  <Moment format="MMM Do YYYY" date={exp.to} /> : 'present'}
                </p>
                <p>
                  <strong>Position:</strong> {exp.title}
                </p>
                {!isEmpty(exp.description) &&
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>}
              </li>
          )}
      </ul>
    </div>}
    {!isEmpty(education) &&
    <div className="col-md-6">
      <h3 className="text-center text-info">Education</h3>
      <ul className="list-group">
        {education
          .map(edu =>
                 <li key={edu._id}
                     className="list-group-item">
                   <h4>{edu.school}</h4>
                   <p>
                     <Moment format="MMM Do YYYY" date={edu.from} /> - {!isEmpty(edu.to) ?
                     <Moment format="MMM Do YYYY" date={edu.to} /> : 'present'}
                   </p>
                   <p><strong>Degree: </strong>{edu.degree}</p>
                   <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                   {!isEmpty(edu.description) &&
                   <p><strong>Description:</strong> {edu.description}</p>}
                 </li>
          )}
      </ul>
    </div>}
  </div>;

ProfileCreds.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCreds;