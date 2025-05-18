import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Notification';

const CreateFBLiveStreamPost = () => {
  const [newPost, setNewPost] = useState({ theme: '', videoContent: '' });
  const [showNotification, setShowNotification] = useState(false);
  const [fieldError, setFieldError] = useState({ theme: false, videoContent: false });

  const validateFields = () => {
    const errors = {
      theme: !newPost.theme.trim(),
      videoContent: !newPost.videoContent.trim()     
    };
    setFieldError(errors);
    return !Object.values(errors).some((error) => error);
  };

  const addLiveStreamPost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:4000/api/fblivestreamposts/', newPost);
      if (response.status === 201) {
        setNewPost(response.data);
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setShowNotification(true);
      return;
    }

    try {
      await addLiveStreamPost(newPost);
      setNewPost({ theme: '', videoContent: '' });
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
       <div className=''>
         <form onSubmit={handleSubmit} container>
           <div className='mb-3'>
             <h3>Create New FB LiveStream</h3>
             <label htmlFor='theme' className='form-label'>
               theme
             </label>
             <input
               type='text'
               className={`form-control form-control-sm ${fieldError.theme ? 'is-invalid' : ''}`}
               id='theme'
               value={newPost.theme}
               onChange={(e) => setNewPost({ ...newPost, theme: e.target.value })}
               required
             />
             {fieldError.theme && <div className='invalid-feedback'>theme is required</div>}
           </div>
           <div className='mb-3'>
            <label htmlFor='videoContent' className='form-label'>
              Full Facebook Url
            </label>
             <textarea
               className={`form-control form-control-sm ${fieldError.videoContent ? 'is-invalid' : ''}`}
               id='videoContent'
               value={newPost.videoContent}
               onChange={(e) => setNewPost({ ...newPost, videoContent: e.target.value })}
               required
             />
             {fieldError.videoContent && <div className='invalid-feedback'>videoContent is required</div>}
           </div>
          
           <div>
           </div>
           <button type='submit' className='btn btn-primary alert-success' style={{ textShadow: '2px 2px 0 #000' }}>
             Create
           </button>
           {showNotification && (
             <Notification
               message={`"${newPost.theme}" has been created successfully now`}
               type='success'
               onClose={() => setShowNotification(false)}
             />
           )}
         </form>
       </div>
     </div>
  );
};

export default CreateFBLiveStreamPost;
