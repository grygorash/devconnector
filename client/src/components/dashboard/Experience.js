import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteExperience } from '../../actions/profileActions';

const Experience = ({experience, deleteExperience}) => {

  const onDeleteClick = id => {
    deleteExperience(id);
  };

  return (
    <div className="experience-content mb-4">
      <h4 className="mb-4">Experience Credentials</h4>
      <div className="container">
        <div className="row">
          <div className="col-md-4"><b>Company</b></div>
          <div className="col-md-3"><b>Title</b></div>
          <div className="col-md-4"><b>Years</b></div>
          <div className="col-md-1" />
        </div>
        {experience
          .map(exp =>
                 <div key={exp._id}
                      className="row">
                   <div className="col-md-4">{exp.company}</div>
                   <div className="col-md-3">{exp.title}</div>
                   <div className="col-md-4">
                     <Moment format="MMM Do YYYY" date={exp.from} /> - {exp.to === null ? 'present' :
                     <Moment format="MMM Do YYYY" date={exp.to} />}
                   </div>
                   <div className="col-md-1">
                     <button onClick={() => onDeleteClick(exp._id)}
                             className="btn btn-danger">Delete
                     </button>
                   </div>
                 </div>
          )}
      </div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience);