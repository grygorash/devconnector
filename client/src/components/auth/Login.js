import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends PureComponent {
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

  static getDerivedStateFromProps(props) {
    props.auth.isAuthenticated && props.history.push('/dashboard');
    return null;
  }

  onChange = ({target}) => {
    this.setState({[target.name]: target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    const {email} = this.state;
    const {password} = this.state;

    this.props.loginUser({email, password,}, this.props.history);
  };

  render() {
    const {email, password} = this.state;
    const {errors} = this.props;
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