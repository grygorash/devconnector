import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addComment } from '../../actions/postActions';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

class CommentForm extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired
  };

  state = {
    text: ''
  };

  onChange = ({target}) => {
    this.setState({[target.name]: target.value});
  };

  onSubmit = e => {
    e.preventDefault();
    const {postId} = this.props;
    const {text} = this.state;
    const {name, avatar} = this.props.auth.user;

    this.props.addComment(postId, {text, name, avatar});
    this.setState({text: ''});
  };

  render() {
    const {text} = this.state;
    const {errors, comments} = this.props;
    const {onChange, onSubmit} = this;

    return (
      <div className="col-md-12">
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">
              Make a comment...
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    placeholder="Reply to post"
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
          <div className="text-right mt-3">Total comments: {comments.length}</div>
        </div>
      </div>
    );
  }
}

const marStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(marStateToProps, {addComment})(CommentForm);