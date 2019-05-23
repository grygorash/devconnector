import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';

import { getPost } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';


const methods = {
  componentDidMount({match, getPost}) {
    getPost(match.params.id);
  }
};

const Post = props => {
  const {post, loading} = props.post;
  
  return (
    <div className="post container">
      {post === null || loading || Object.keys(post).length === 0 ?
        <Spinner /> :
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">Back To Feed</Link>
            <div className="card card-body mb-3">
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
                </div>
              </div>
            </div>
          </div>
          <CommentForm comments={post.comments} postId={post._id} />
          <CommentFeed comments={post.comments} postId={post._id} />
        </div>}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {getPost})(lifecycle(methods)(Post));
