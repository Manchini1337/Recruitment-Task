import classes from './PostListItem.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Comment from '../Comment/Comment';

const PostListItem = ({ post }) => {
  const [comments, setComments] = useState('');

  // each post is fetching its individual comments
  useEffect(() => {
    axios
      .get(`https://gorest.co.in/public/v1/posts/${post.id}/comments`)
      .then((response) => setComments(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.post}>
      <div className={classes.title}>
        <h2>{post.title}</h2>
      </div>
      <div className={classes.body}>{post.body}</div>
      <div className={classes.comments}>
        <h2 style={{ textAlign: 'center' }}>Comments: </h2>
        {comments.length === 0 ? (
          <div style={{ textAlign: 'center' }}>No comments found.</div>
        ) : (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostListItem;
