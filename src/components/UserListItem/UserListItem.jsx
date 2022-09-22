import classes from './UserListItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';

const UserListItem = ({ user }) => {
  // determining some classes/icons based on user data (in this case status and gender)
  const icon = user.gender === 'female' ? faPersonDress : faPerson;
  const status = user.status === 'active' ? classes.active : classes.inactive;

  return (
    <div className={classes.card}>
      <div className={classes.icon}>
        <FontAwesomeIcon size='6x' icon={icon} />
      </div>
      <div className={classes.body}>
        <div className={classes.title}>
          <h3>Name:</h3>
          <span className={classes.name}>{user.name}</span>
          <h3>Email:</h3>
          <span className={classes.email}>{user.email}</span>
        </div>
        <div className={classes.details}>
          <span className={classes.id}>Id: {user.id}</span>
          <span className={classes.gender}>Gender: {user.gender}</span>
          <span className={status}>Status: {user.status}</span>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
