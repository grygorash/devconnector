import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteComment } from '../../actions/postActions';

const CommentFeed = ({comments, postId, auth}) => {
  const onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId);
  };

  return (
    <div className="col-md-12">
      {comments
        .map(comment =>
               <div key={comment._id}
                    className="card card-body mb-3">
                 <div className="row">
                   <div className="col-md-2">
                     <Link to={`/profile/${comment.name}`}>
                       <img
                         className="rounded-circle d-none d-md-block"
                         src={comment.avatar}
                         alt=""
                       />
                     </Link>
                     <br />
                     <p className="text-center">{comment.name}</p>
                   </div>
                   <div className="col-md-10">
                     <p className="lead">{comment.text}</p>
                     {comment.user === auth.user.id &&
                     <button
                       onClick={() => onDeleteClick(postId, comment._id)}
                       type="button"
                       className="btn btn-danger mr-1">
                       Delete Comment
                     </button>}
                   </div>
                 </div>
               </div>
        )}
    </div>
  );
};

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const marStateToProps = state => ({
  auth: state.auth
});
export default connect(marStateToProps, {deleteComment})(CommentFeed);
