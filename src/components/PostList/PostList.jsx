import classes from './PostList.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PostListItem from '../PostListItem/PostListItem';
import AddPostForm from '../AddPostForm/AddPostForm';

const PostList = () => {
  const [posts, setPosts] = useState('');

  // fetching posts data from api
  useEffect(() => {
    axios
      .get('https://gorest.co.in/public/v1/posts')
      .then((response) => setPosts(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      {posts.length === 0 ? (
        <h1 className={classes.loading}>Loading...</h1>
      ) : (
        <div>
          {posts.map((post) => (
            <PostListItem post={post} key={post.id} />
          ))}
        </div>
      )}
      <div className={classes.form}>
        <AddPostForm />
      </div>
    </div>
  );
};
export default PostList;
