import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios'; 
import OtherHeaderContent from "../OtherHeaderContent";
import CreateBiblePost from "./CreateBiblePost";
import BibleDetails from "./BibleDetails";

const HomeBiblePost = () => {
  const [BiblePosts, setBiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page

  const fetchData = async () => {
    try {
      const response = await axios.patch('http://localhost:4000/api/sipmRoute/');
      setBiblePosts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleDelete = async (postId) => {
  //   const isConfirmed = window.confirm('Are you sure you want to delete this post?');
  //   if (!isConfirmed) {
  //     console.log('Deletion canceled');
  //     return;
  //   }

  //   try {
  //     await axios.delete(`http://localhost:4000/api/sipmRoute/${postId}`);
  //     fetchData(); // Refetch data after deletion
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

  // let text;
  // if (confirm("Press a button!") == true) {
  //   text = "You pressed OK!";
  // } else {
  //   text = "You canceled!";
  // }

  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      try {
        console.log('Deleting post with ID:', postId); // Log postId for debugging
        const response = await axios.delete(`http://localhost:4000/api/sipmRoute/${postId}`);
        console.log('Delete response:', response); // Log the response for debugging
        window.location.href = '/HomeBiblePost'; // Reload the page after deletion
      } catch (error) {
        console.error('Error deleting post:', error.response?.data || error.message);
      }
    } else {
      console.log('Deletion canceled');
    }
  };
  
  
  
  

  const handleUpdate = (updatedPost) => {
    setBiblePosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  // Calculate the indexes for the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = BiblePosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <OtherHeaderContent />
      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3  bg-info' style={{paddingTop: "50px"}}>
        <h2><strong>Bible Management Console</strong></h2>
        <div className="BiblePosts">
          {currentPosts.map((BiblePost) => (
            <BibleDetails
              BiblePost={BiblePost}
              key={BiblePost._id}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(BiblePosts.length / postsPerPage) }).map((_, index) => (
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
        <CreateBiblePost />
      </div>
    </div>
  );
};

export default HomeBiblePost;
