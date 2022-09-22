import classes from './AddUserForm.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const AddUserForm = () => {
  const emptyForm = {
    name: '',
    email: '',
    status: 'active',
    gender: 'male',
  };
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  // Sending POST request with submitted form data to create a new user.
  const handleSubmit = async (e) => {
    // preventing browser from its default behaviour.
    e.preventDefault();
    // awaiting response from api, then showing feedback to the user.
    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v1/users',
        {
          name: formData.name,
          email: formData.email,
          status: formData.status,
          gender: formData.gender,
        },
        {
          headers: {
            Authorization:
              'Bearer 82af8467cd510fc686a0b760678554ca333ce07cd644cc07964425599ee03e12',
          },
        }
      );
      if (response.status === 201) {
        setStatus('User added!');
        /* 
          dispatching user data to redux store.
          now user id is kept in global state and can be accessed at any time.
          user id is neccessary to create new posts linked to said user
        */
        dispatch(userActions.setUserData(response.data.data));
        setFormData(emptyForm);
      }
    } catch (err) {
      setStatus('Error! Try again.');
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2 className={classes.title}>Add user</h2>
      <div className={classes.form__group}>
        <label htmlFor='name'>Name:</label>
        <div className={classes.input__group}>
          <input
            type='text'
            required
            pattern='.{3,}'
            id='name'
            name='name'
            placeholder='Name'
            /* wiring all form values with formData state */
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setStatus('');
            }}
            value={formData.name}
          />
          <i className='bx bx-user' />
        </div>
      </div>
      <div className={classes.form__group}>
        <label htmlFor='email'>Email:</label>
        <div className={classes.input__group}>
          <input
            type='email'
            required
            id='email'
            name='email'
            placeholder='Email'
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setStatus('');
            }}
            value={formData.email}
          />
          <i className='bx bx-envelope' />
        </div>
      </div>

      <div className={classes.form__group}>
        <label htmlFor='gender'>Gender:</label>
        <select
          id='gender'
          className={classes.select}
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
            setStatus('');
          }}
        >
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
      </div>

      <div className={classes.form__group}>
        <label htmlFor='status'>Status:</label>
        <select
          id='status'
          className={classes.select}
          onChange={(e) => {
            setFormData({ ...formData, status: e.target.value });
            setStatus('');
          }}
        >
          <option value='active'>Active</option>
          <option value='inactive'>Inactive</option>
        </select>
      </div>
      <button className={classes.button} type='submit'>
        Add
      </button>
      <h4 className={classes.status}>{status}</h4>
    </form>
  );
};

export default AddUserForm;
