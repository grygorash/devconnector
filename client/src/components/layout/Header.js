import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';

const Header = ({auth}) =>
  <header>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">DevConnector</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">Developers</Link>
            </li>
          </ul>
          {auth.isAuthenticated ? <AuthLinks /> : <GuestLinks />}
        </div>
      </div>
    </nav>
  </header>;

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapDispatchToProps = state => ({
  auth: state.auth
});

export default connect(mapDispatchToProps)(Header);