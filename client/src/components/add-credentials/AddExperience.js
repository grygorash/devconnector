import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addExperience } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddExperience extends PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
  };

  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false
  };

  onChange = ({target}) => {
    this.setState({[target.name]: target.value});
  };

  onCheck = () => {
    this.setState({
                    disabled: !this.state.disabled,
                    current: !this.state.current
                  });
  };

  onSubmit = e => {
    e.preventDefault();
    const {company, title, location, from, to, current, description} = this.state;
    const {history} = this.props;

    this.props.addExperience({company, title, location, from, to, current, description}, history);
  };

  render() {
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description,
      disabled
    } = this.state;
    const {errors} = this.props;
    const {onSubmit, onChange, onCheck} = this;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add any job or position that you have had in the past or current</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={onChange}
                  error={errors.company} />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  error={errors.title} />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={onChange}
                  error={errors.location} />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={from}
                  onChange={onChange}
                  error={errors.from} />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={to}
                  onChange={onChange}
                  error={errors.to}
                  disabled={disabled ? 'disabled' : ''} />
                <div className="form-check mb-4">
                  <input type="checkbox"
                         className="form-check-input"
                         name="current"
                         value={current}
                         checked={current}
                         onChange={onCheck}
                         id="current" />
                  <label className="form-check-label"
                         htmlFor="current">Current</label>
                </div>
                <TextAreaFieldGroup placeholder="Job Description"
                                    name="description"
                                    value={description}
                                    onChange={onChange}
                                    error={errors.description} />
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

const marStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(marStateToProps, {addExperience})(withRouter(AddExperience));