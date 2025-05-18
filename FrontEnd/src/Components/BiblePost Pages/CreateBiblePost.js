import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Notification'; // Import your Notification component

const CreateBiblePost = ({ addBiblePost }) => {
  const [newPost, setNewPost] = useState({ title: '', description: '', bibleVerse: '' });
  const [showNotification, setShowNotification] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBiblePost(newPost);
      setShowNotification(true); // Set showNotification to true after successfully creating the post
      setNewPost({ title: '', description: '', bibleVerse: '' });
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };



//TO CREATE NEW POST
 addBiblePost = async (newPost) => {
  try {
    const response = await axios.post('http://localhost:4000/api/sipmRoute/', newPost);
    if (response.status === 201) {
      setNewPost([...newPost, response.data]);
    }
  } catch (error) {
    console.error('Error creating data:', error);
  }
};

  const handleButtonClick = () => {
    setShowNotification(true);
  };

  return (
    <form onSubmit={handleSubmit} container>
      <div className="mb-3">
        <h3>Create New Post</h3>
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control form-control-sm"
          id="description"
          value={newPost.description}
          onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bibleVerse" className="form-label">
          Bible Verse
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="bibleVerse"
          value={newPost.bibleVerse}
          onChange={(e) => setNewPost({ ...newPost, bibleVerse: e.target.value })}
        />
      </div>
      <button type="submit" onClick={handleButtonClick} message = {`${newPost.title} have been created successfully`} className="btn btn-primary alert-success" style={{textShadow: '2px 2px 0 #000'}}>
        Create
      </button>
      <button onClick={handleButtonClick}></button>
      {showNotification && (
        <Notification
          message = {`${newPost.title} have been created successfully now`}
          //message="This is a notification message!"
          type="success" // You can change this to "error" for an error message
          onClose={() => setShowNotification(false)}
        />
      )}
    </form>
  );
};

export default CreateBiblePost;

