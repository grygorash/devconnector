import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addPost } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class PostForm extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    addPost: PropTypes.func.isRequired
  };

  state = {
    text: ''
  };

  onChange = ({target}) => {
    this.setState({[target.name]: target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    const {text} = this.state;
    const {name,avatar} = this.props.auth.user;

    this.props.addPost({text, name, avatar});
    this.setState({text: ''});
  };

  render() {
    const {text} = this.state;
    const {errors, posts} = this.props;
    const {onChange, onSubmit} = this;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Something...
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={text}
                  onChange={onChange}
                  error={errors.text} />
              </div>
              <input type="submit"
                     value="Submit"
                     className="btn btn-dark" />
            </form>
          </div>
        </div>
        <div className="text-right mt-3">Total posts: {posts.length}</div>
      </div>
    );
  }
}

const marStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(marStateToProps, {addPost})(PostForm);