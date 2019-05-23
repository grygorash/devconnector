import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';

import { getPosts } from '../../actions/postActions';
import PostForm from './PostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';

const methods = {
  componentDidMount(props) {
    props.getPosts();
  }
};

const Posts = ({post}) =>
  <div className="feed">
    {post.posts === null || post.loading ? <Spinner /> :
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PostForm posts={post.posts} />
            <PostFeed posts={post.posts} />
          </div>
        </div>
      </div>}
  </div>;

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {getPosts})(lifecycle(methods)(Posts));