import React from 'react';
import { Link } from 'react-router-dom';
import { FaBlackTie, FaGraduationCap, FaUserCircle } from 'react-icons/fa';

const ProfileActions = () =>
  <div className="btn-group mb-4"
       role="group">
    <Link to="/edit-profile"
          className="btn btn-light">
      <FaUserCircle color="#0098E2" className="mr-2 mb-1" />
      Edit Profile
    </Link>
    <Link to="/add-experience"
          className="btn btn-light">
      <FaBlackTie color="#0098E2" className="mr-2 mb-1" />
      Add Experience
    </Link>
    <Link to="/add-education"
          className="btn btn-light">
      <FaGraduationCap color="#0098E2" className="mr-2 mb-1" />
      Add Education
    </Link>
  </div>;

export default ProfileActions;