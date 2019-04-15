import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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
    this.props.registerUser({
                              name: this.state.name,
                              email: this.state.email,
                              password: this.state.password,
                              password2: this.state.password2,
                            }, this.props.history);
  };

  render() {
    const {name, email, password, password2, errors} = this.state;
    const {onChange, onSubmit} = this;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={onSubmit}>
                <TextFieldGroup placeholder="Name"
                                name="name"
                                value={name}
                                error={errors.name}
                                onChange={onChange} />
                <TextFieldGroup type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                error={errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                onChange={onChange} />
                <TextFieldGroup type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                error={errors.password}
                                onChange={onChange} />
                <TextFieldGroup type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                error={errors.password2}
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

export default connect(mapStateToProps, {registerUser})(withRouter(Register));