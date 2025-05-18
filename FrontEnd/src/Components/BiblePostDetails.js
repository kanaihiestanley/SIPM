import React from 'react';


const BiblePostDetails = ({ BiblePost }) => {
  return (
    <div style={{marginTop: "200px"}}>        
      <h2>Bible Post Details</h2>
      <p>Title: {BiblePost.title}</p>
      <p>Description: {BiblePost.description}</p>
      <p>Bible Verse: {BiblePost.bibleVerse}</p>
    </div>
  );
};

export default BiblePostDetails;
