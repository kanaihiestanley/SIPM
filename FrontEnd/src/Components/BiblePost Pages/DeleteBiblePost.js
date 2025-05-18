import React from 'react';

const DeleteBiblePost = ({ BiblePost, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(BiblePost.id);
  };

  return (
    <div>
      <h2>Delete Bible Post</h2>
      <p>Are you sure you want to delete the post?</p>
      <button type="button" onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default DeleteBiblePost;
