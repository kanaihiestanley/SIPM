import React, { useState } from 'react';
import axios from 'axios';

const EditBiblePost = ({ BiblePost }) => {
  const [editableValues, setEditableValues] = useState({
    title: BiblePost.title,
    description: BiblePost.description,
    bibleVerse: BiblePost.bibleVerse,
  });
  const [showNotification, setShowNotification] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BiblePost(editableValues);
      setShowNotification(true); // Set showNotification to true after successfully creating the post
      setEditableValues({ title: '', description: '', bibleVerse: '' });
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  //TO CREATE NEW POST
 BiblePost = async (editableValues) => {
  try {
    const response = await axios.patch('http://localhost:4000/api/sipmRoute/', editableValues);
    if (response.status === 201) {
      setEditableValues([...editableValues, response.data]);
    }
  } catch (error) {
    console.error('Error creating data:', error);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleButtonClick = () => {
    setShowNotification(true);
  };
  return (
    <form onSubmit={handleSubmit} container>
      <div style={{ marginTop: "200px" }}>
        <h2>Bible Post Details</h2>
        <p>
          Title:
          <input
            type="text"
            name="title"
            value={editableValues.title}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Description:
          <input
            type="text"
            name="description"
            value={editableValues.description}
            onChange={handleInputChange}
          />
        </p>
        <p>
          Bible Verse:
          <input
            type="text"
            name="bibleVerse"
            value={editableValues.bibleVerse}
            onChange={handleInputChange}
          />
        </p>
        <button type="submit" onClick={handleButtonClick} message = {`${editableValues.title} have been created successfully`} className="btn btn-primary alert-success" style={{textShadow: '2px 2px 0 #000'}}>
          Create
        </button>
      </div>
    </form>
  );
};

export default EditBiblePost;
