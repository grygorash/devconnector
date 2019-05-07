import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { deleteEducation } from '../../actions/profileActions';

const Education = ({education, deleteEducation}) => {

  const onDeleteClick = id => {
    deleteEducation(id);
  };

  return (
    <div className="education-content">
      <h4 className="mb-4">Education Credentials</h4>
      <div className="container">
        <div className="row">
          <div className="col-md-4"><b>School</b></div>
          <div className="col-md-3"><b>Degree</b></div>
          <div className="col-md-4"><b>Years</b></div>
          <div className="col-md-1" />
        </div>
        {education
          .map(edu =>
                 <div key={edu._id}
                      className="row">
                   <div className="col-md-4">{edu.school}</div>
                   <div className="col-md-3">{edu.degree}</div>
                   <div className="col-md-4">
                     <Moment format="MMM Do YYYY" date={edu.from} /> - {edu.to === null ? 'present' :
                     <Moment format="MMM Do YYYY" date={edu.to} />}
                   </div>
                   <div className="col-md-1">
                     <button onClick={() => onDeleteClick(edu._id)}
                             className="btn btn-danger">Delete
                     </button>
                   </div>
                 </div>
          )}
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, {deleteEducation})(Education);