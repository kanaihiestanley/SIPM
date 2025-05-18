import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';
import FBLiveStreamDetails from './FBLiveStreamDetails';
import CreateFBLiveStreamPost from './CreateFBLiveStreamPost';

const HomeFBLiveStream = () => {
  const [LiveStreamPosts, setLiveStreamPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page

  // RETRIEVE POST
  useEffect(() => {
    axios.get('http://localhost:4000/api/fblivestreamposts/')
      .then((response) => {
        setLiveStreamPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/fblivestreamposts/${postId}`);
        setLiveStreamPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    } else {
      console.log('Deletion canceled');
    }
  };

  const handleUpdate = (updatedPost) => {
    setLiveStreamPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  // Calculate the indexes for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = LiveStreamPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>

      <OtherHeaderContent />


      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3  bg-info' style={{paddingTop: "50px"}}>
        <h2><strong>Facebook Stream Management Console</strong></h2>
        <div className="LiveStreamPosts">
          {currentPosts.map((LiveStreamPost) => (
            <FBLiveStreamDetails
              LiveStreamPost={LiveStreamPost}
              key={LiveStreamPost._id}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(LiveStreamPosts.length / postsPerPage) }).map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 pe-3 bg-info pt-8'>
        <CreateFBLiveStreamPost />
      </div>
    </div>
  );
};

export default HomeFBLiveStream;
