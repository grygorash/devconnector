import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  state = {
    email: '',
    password: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push('/dashboard');
    }

    if (nextProps.errors !== prevState.errors) {
      return {
        errors: nextProps.errors
      };
    }
    return null;
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.loginUser({
                           email: this.state.email,
                           password: this.state.password,
                         });
  };

  render() {
    const {email, password, errors} = this.state;
    const {onChange, onSubmit} = this;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form onSubmit={onSubmit}>
                <TextFieldGroup type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                error={errors.email}
                                onChange={onChange} />
                <TextFieldGroup type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                error={errors.password}
                                onChange={onChange} />
                <input type="submit"
                       value="Submit"
                       className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withRouter(Login));