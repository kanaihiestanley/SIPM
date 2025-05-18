import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';
import GalleryDetails from './GalleryDetails';
import CreateGalleryPost from './CreateGalleryPost';

const HomeGallery = () => {
  const [galleryPosts, setGalleryPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page

  // RETRIEVE POST
  useEffect(() => {
    axios.get('http://localhost:4000/api/galleryposts/')
      .then((response) => {
        setGalleryPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/galleryposts/${postId}`);
        setGalleryPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    } else {
      console.log('Deletion canceled');
    }
  };

  const handleUpdate = (updatedPost) => {
    setGalleryPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  // Calculate the indexes for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = galleryPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>

      <OtherHeaderContent />


      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3  bg-info' style={{paddingTop: "50px"}}>
        <h2><strong>Gallery Management Console</strong></h2>
        <div className="GalleryPosts">
          {currentPosts.map((galleryPost) => (
            <GalleryDetails
              GalleryPost={galleryPost}
              key={galleryPost._id}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(galleryPosts.length / postsPerPage) }).map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 pe-3 bg-info'>
        <CreateGalleryPost />
      </div>
    </div>
  );
};

export default HomeGallery;
