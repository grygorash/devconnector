import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { FaThumbsDown, FaThumbsUp, FaTimes } from 'react-icons/fa';

import { addLike, addUnlike, deletePost } from '../../actions/postActions';

const PostFeed = ({posts, auth, deletePost, addLike, addUnlike}) => {

  const onDeleteClick = id => {
    deletePost(id);
  };

  const onLikeClick = id => {
    addLike(id, 'noReload');
  };

  const onDislike = id => {
    addUnlike(id, 'noReload');
  };

  return (
    <div className="posts">
      {posts
        .map(post =>
               <div key={post._id}
                    className="card card-body mb-3">
                 <div className="row">
                   <div className="col-md-2">
                     <Link to={`/profile/${post.name}`}>
                       <img className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt="" />
                     </Link>
                     <br />
                     <p className="text-center">{post.name}</p>
                   </div>
                   <div className="col-md-10">
                     <p className="lead">{post.text}</p>
                     <button type="button"
                             className={classnames('btn btn-light mr-1', {'disabled': post.likes.filter(like => like.user === auth.user.id).length > 0})}
                             onClick={() => onLikeClick(post._id)}>
                       <FaThumbsUp
                         className={classnames('mb-1', {'text-info': post.likes.filter(like => like.user === auth.user.id).length > 0})} />
                       <span className="badge badge-light ml-2">{post.likes.length}</span>
                     </button>
                     <button type="button"
                             className={classnames('btn btn-light mr-1', {'disabled': post.dislikes.filter(like => like.user === auth.user.id).length > 0})}
                             onClick={() => onDislike(post._id)}>
                       <FaThumbsDown
                         className={classnames('mb-1', {'text-danger': post.dislikes.filter(like => like.user === auth.user.id).length > 0})} />
                       <span className="badge badge-light ml-2">{post.dislikes.length}</span>
                     </button>
                     <Link to={`/post/${post._id}`}
                           className="btn btn-info mr-1">
                       Comments
                       <span className="badge badge-info ml-2">{post.comments.length}</span>
                     </Link>
                     {post.user === auth.user.id &&
                     <button type="button"
                             className="btn btn-danger mr-1"
                             onClick={() => onDeleteClick(post._id)}>
                       <FaTimes className="mb-1" />
                     </button>}
                   </div>
                 </div>
               </div>
        )
      }
    </div>
  );
};

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addUnlike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, addUnlike})(PostFeed);