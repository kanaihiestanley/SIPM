import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Notification';

const CreateGalleryPost = ({ addGalleryPost }) => {
  const [newPost, setNewPost] = useState({ title: '', description: '', imageUrl: '', image: null });
  const [showNotification, setShowNotification] = useState(false);
  const [fieldError, setFieldError] = useState({ title: false, description: false, imageUrl: false });

  const validateFields = () => {
    const errors = {
      title: !newPost.title.trim(),
      description: !newPost.description.trim(),
      imageUrl: !newPost.imageUrl.trim(),
    };
    setFieldError(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setShowNotification(true);
      return;
    }

    try {
      await addGalleryPost(newPost);
      setShowNotification(true);
      setNewPost({ title: '', description: '', imageUrl: '' });
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

 
  //TO CREATE NEW POST
  addGalleryPost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:4000/api/galleryposts/', newPost);
      if (response.status === 201) {
        setNewPost([...newPost, response.data]);
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };


 

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <div className=''>
        <form onSubmit={handleSubmit} container>
          <div className='mb-3'>
            <h3>Create New Gallery</h3>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className={`form-control form-control-sm ${fieldError.title ? 'is-invalid' : ''}`}
              id='title'
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            {fieldError.title && <div className='invalid-feedback'>Title is required</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              className={`form-control form-control-sm ${fieldError.description ? 'is-invalid' : ''}`}
              id='description'
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              required
            />
            {fieldError.description && <div className='invalid-feedback'>Description is required</div>}
          </div>
          <div className='mb-3'>
            <label htmlFor='imageUrl' className='form-label'>
              Image Upload
            </label>
            <input
              type='file'
              className={`form-control form-control-sm ${fieldError.imageUrl ? 'is-invalid' : ''}`}
              id='imageUrl'
              value={newPost.imageUrl}
              onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
              required
            />
            {fieldError.imageUrl && <div className='invalid-feedback'>Image URL is required</div>}
          </div>
          <div>
          </div>
          <button type='submit' className='btn btn-primary alert-success' style={{ textShadow: '2px 2px 0 #000' }}>
            Create
          </button>
          {showNotification && (
            <Notification
              message={`"${newPost.title}" has been created successfully now`}
              type='success'
              onClose={() => setShowNotification(false)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGalleryPost;

