import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';
import formatDate from '../formatDate';

const YTStreamPost = ({ postId }) => {
    const [LiveStreamPosts, setLiveStreamPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5; // Number of posts to display per page

    useEffect(() => {
        axios.get('http://localhost:4000/api/livestreamposts/')
          .then((response) => {
            setLiveStreamPosts(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    }, []);

    // Calculate the indexes for the current page
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = LiveStreamPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="LiveStream-details" style={{ marginTop: "10px" }}>
            <OtherHeaderContent />
            <div className='row '>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {currentPosts.map((LiveStreamPost, index) => (
                        <div key={index} className="">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        <strong>Theme: </strong>{ LiveStreamPost.theme}
                                    </h4>
                                    <div dangerouslySetInnerHTML={{ __html: LiveStreamPost.videoContent }} />
                                    {/* Embed the iframe directly from videoContent */}
                                    <p className="card-text">{formatDate (LiveStreamPost.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
    );
}

export default YTStreamPost;
