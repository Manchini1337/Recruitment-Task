import classes from './MainHeader.module.css';
import { NavLink } from 'react-router-dom';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <ul className={classes.navList}>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : '')}
            to='/users'
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : '')}
            to='/posts'
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : '')}
            to='/todos'
          >
            Todos
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default MainHeader;
