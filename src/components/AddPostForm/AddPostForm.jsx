import classes from './AddPostForm.module.css';
import { useState } from 'react';
import axios from 'axios';

const AddPostForm = () => {
  const emptyForm = {
    title: '',
    body: '',
    user_id: 0,
  };
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState('');

  // Sending POST request with submitted form data to create a new user.
  const handleSubmit = async (e) => {
    // preventing browser from its default behaviour.
    e.preventDefault();
    // awaiting response from api, then showing feedback to the user.
    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v1/posts',
        {
          title: formData.title,
          body: formData.body,
          user_id: formData.user_id,
        },
        {
          headers: {
            Authorization:
              'Bearer 82af8467cd510fc686a0b760678554ca333ce07cd644cc07964425599ee03e12',
          },
        }
      );
      if (response.status === 201) {
        setStatus('Post added!');
        setFormData(emptyForm);
      }
    } catch (err) {
      setStatus('Error! Try again.');
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h2 className={classes.title}>Add Post</h2>
      <div className={classes.form__group}>
        <label htmlFor='title'>Post title:</label>
        <div className={classes.input__group}>
          <input
            type='text'
            required
            pattern='.{3,}'
            id='title'
            name='title'
            placeholder='Title'
            /* wiring all form values with formData state */
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              setStatus('');
            }}
            value={formData.title}
          />
          <i className='bx bx-text'></i>
        </div>
      </div>
      <div className={classes.form__group}>
        <label htmlFor='Body'>Post body:</label>
        <div className={classes.input__group}>
          <input
            type='text'
            required
            pattern='.{3,}'
            id='body'
            name='body'
            placeholder='Body'
            onChange={(e) => {
              setFormData({ ...formData, body: e.target.value });
              setStatus('');
            }}
            value={formData.body}
          />
          <i className='bx bx-comment'></i>
        </div>
      </div>

      <div className={classes.form__group}>
        <label htmlFor='userId'>User id:</label>
        <div className={classes.input__group}>
          <input
            type='number'
            required
            min={0}
            value={formData.user_id}
            onChange={(e) => {
              setFormData({ ...formData, user_id: e.target.value });
              setStatus('');
            }}
          />
        </div>
      </div>

      <button className={classes.button} type='submit'>
        Add
      </button>
      <h4 className={classes.status}>{status}</h4>
    </form>
  );
};

export default AddPostForm;
