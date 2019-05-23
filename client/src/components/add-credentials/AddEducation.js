import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { addEducation } from '../../actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class AddEducation extends PureComponent {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
  };

  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
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
    const {school, degree, fieldofstudy, from, to, current, description} = this.state;
    const {history} = this.props;

    this.props.addEducation({school, degree, fieldofstudy, from, to, current, description}, history);
  };

  render() {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      disabled
    } = this.state;
    const {errors} = this.props;
    const {onSubmit, onChange, onCheck} = this;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={school}
                  onChange={onChange}
                  error={errors.school} />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={degree}
                  onChange={onChange}
                  error={errors.degree} />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={onChange}
                  error={errors.fieldofstudy} />
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
                         htmlFor="current">Current Job</label>
                </div>
                <TextAreaFieldGroup placeholder="Program Description"
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

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));