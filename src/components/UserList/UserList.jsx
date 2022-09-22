import classes from './UserList.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserListItem from '../UserListItem/UserListItem';
import AddUserForm from '../AddUserForm/AddUserForm';
import { useSelector } from 'react-redux';

const UserList = () => {
  const [users, setUsers] = useState([]);

  // fetching user data from api
  useEffect(() => {
    axios
      .get('https://gorest.co.in/public/v1/users')
      .then((response) => setUsers(response.data.data))
      .catch((err) => console.log(err));
  }, []);

  // fetching app-wide user state to keep track of its user id.
  // user id is neccessary to create new post.
  const user = useSelector((state) => state.user);

  return (
    <div className={classes.container}>
      {users.length === 0 ? (
        <h1 className={classes.loading}>Loading...</h1>
      ) : (
        <div className={classes.userGrid}>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </div>
      )}
      <div className={classes.form}>
        <AddUserForm />
        <h1>Last added user:</h1>
        <UserListItem user={user} />
      </div>
    </div>
  );
};

export default UserList;
