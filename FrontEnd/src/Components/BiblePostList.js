import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import BiblePostDetails from './BiblePostDetails';
// import DeleteBiblePost from './DeleteBiblePost';
import EditBiblePost from './BiblePost Pages/EditBiblePost';

const BiblePostList = () => {
  const [BiblePosts, setBiblePosts] = useState([]);

  // GET ALL POST LIST
  useEffect(() => {
    axios.get('http://localhost:4000/api/sipmRoute/')
      .then((response) => {
        setBiblePosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEditClick = (BiblePost) => {
    // Open EditBiblePost in a new window
    const editWindow = window.open('', '_blank');
    editWindow.document.write('<html><head><title>Edit Bible Post</title></head><body>');
    editWindow.document.write('<div id="root"></div>');
    editWindow.document.write('</body></html>');
    editWindow.document.close();

    // Render EditBiblePost component in the new window
    const editRoot = editWindow.document.getElementById('root');
    editRoot && ReactDOM.render(<EditBiblePost BiblePost={BiblePost} />, editRoot);
  };



  const handleDetailsPost = (BiblePost) => {
    // Open EditBiblePost in a new window
    const editWindow = window.open('', '_blank');
    editWindow.document.write('<html><head><title>Bible Details Post</title></head><body>');
    editWindow.document.write('<div id="root"></div>');
    editWindow.document.write('</body></html>');
    editWindow.document.close();

    // Render EditBiblePost component in the new window
    const editRoot = editWindow.document.getElementById('root');
    editRoot && ReactDOM.render(<BiblePostDetails BiblePost={BiblePost} />, editRoot);
  };

  return (
    <div className='w-100 vh-100 d-flex justify-center align-items-center'>
      <div className='w-100'>
        <h2>All Bible Post List</h2>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Bible Verse</th>
              <th>Edit</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody style={{ paddingTop: '20px' }}>
            {BiblePosts && BiblePosts.length > 0
              ? BiblePosts.map((BiblePost) => {
                return (
                  <tr key={BiblePost.id}>
                    <td>{BiblePost.title}</td>
                    <td style={{ width: '350px' }}>{BiblePost.description}</td>
                    <td>{BiblePost.bibleVerse}</td>
                    <td>
                      <button
                        className='btn btn-warning bg-warning text-white'
                        onClick={() => handleEditClick(BiblePost)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button className='btn btn-success bg-success text-white' onClick={() => handleDetailsPost(BiblePost)}>
                        Details
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-danger bg-danger text-white'>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
              : "no data found"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiblePostList;
