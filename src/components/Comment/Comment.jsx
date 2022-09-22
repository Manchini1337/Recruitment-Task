import classes from './Comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ comment }) => {
  return (
    <div className={classes.comment}>
      <div className={classes.title}>
        <div className={classes.iconGroup}>
          <FontAwesomeIcon icon={faUser} />
          <span className={classes.name}>{comment.name}</span>
        </div>
        <div className={classes.iconGroup}>
          <FontAwesomeIcon icon={faEnvelope} />
          <span className={classes.email}>{comment.email}</span>
        </div>
      </div>
      <div className={classes.body}>{comment.body}</div>
    </div>
  );
};

export default Comment;
