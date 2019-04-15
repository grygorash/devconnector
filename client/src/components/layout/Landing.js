import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';

import { clearErrors } from '../../actions/authActions';

const methods = {
  componentDidMount(props) {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard');
    }
  }
};

const Landing = ({errors, clearErrors}) => {
  const onClearErrors = () => {
    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
  };

  return (
    <section className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector </h1>
              <p className="lead"> Create a developer profile/portfolio, share posts and get help from other
                                   developers</p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2" onClick={onClearErrors}>Sign Up</Link>
              <Link to="/login" className="btn btn-lg btn-light" onClick={onClearErrors}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {clearErrors})(lifecycle(methods)(Landing));
