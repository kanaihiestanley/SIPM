import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import OtherHeaderContent from '../OtherHeaderContent';
import { NavLink } from "react-router-dom";

const LivestreamUserDisplay = () => {
  const [firstFBLivePost, setFirstFBLivePost] = useState(null);
  const [showFullContent, setShowFullContent] = useState(false);

// GET ALL POST LIST
  useEffect(() => {
      axios.get('http://localhost:4000/api/livestreamposts/')
      .then((response) => {
          const posts = response.data;
          if (posts && posts.length > 0) {
          setFirstFBLivePost(posts[0]);  // Set the first post
          }
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
      });
  }, []);

  const truncateText = (text, limit) => {
      const words = text.split(' ');
      if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
      }
      return text;
  };
  return(
<div id='singleFacebookPost'>
  <div className="card-section col-lg-5 col-md-5 col-sm-6 clearfix">
  <div className="card">       
      <div className='w-100'>
          
      <div style={{ paddingTop: '20px', margin: '15px' }}>
          {firstFBLivePost ? (
          <div key={firstFBLivePost.id}>
              <h2><strong>{firstFBLivePost.title}</strong></h2>
              <hr />
              <p> 
              {showFullContent
                  ? firstFBLivePost.description 
                  
                  : truncateText(firstFBLivePost.description, 100)}
              </p>
              <p><strong>{firstFBLivePost.FBLiveVerse}</strong></p>                
              <div className="card-body">                                               
              <NavLink to='/' className='btn btn-primary' onClick={() => setShowFullContent(!showFullContent)}>
                  {showFullContent ? 'Read Less' : 'Read More...'}
              </NavLink>
              </div>
          </div>
          ) : (
          <div>
              <div colSpan="6">No data found</div>
          </div>
          )}
          </div> 
        </div>  
      </div>
    </div>
    </div>
  )
}


export default LivestreamUserDisplay;
