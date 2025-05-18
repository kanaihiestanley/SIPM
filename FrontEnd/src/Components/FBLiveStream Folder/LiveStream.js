import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';

const LiveStream = ({ postId }) => {
    const [LiveStreamPosts, setLiveStreamPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 1; // Number of posts to display per page

    useEffect(() => {
        axios.get('http://localhost:4000/api/fblivestreamposts/')
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

    const isToday = (dateString) => {
        const postDate = new Date(dateString);
        const today = new Date();
        return postDate.getDate() === today.getDate() &&
            postDate.getMonth() === today.getMonth() &&
            postDate.getFullYear() === today.getFullYear();
    };

    const renderVideoContent = (videoContent, createdAt) => {
        if (isToday(createdAt)) {
            if (videoContent.includes('plugins/video.php?href')) {
                // If the content is an embedment, render the iframe directly
                return (
                    <iframe
                        id='facebookstream'
                        title='Facebook Live Stream Video'
                        src={videoContent}
                        width='640'
                        height='360'
                        style={{
                            border: 'none',
                            overflow: 'hidden',
                            transform: `none`,
                        }}
                        scrolling='no'
                        frameBorder='0'
                        allowFullScreen={true}
                        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                    ></iframe>
                );
            } else {
                // Otherwise, assume it's a direct URL and construct the embedment URL
                return (
                    <iframe
                        id='facebookstream'
                        title='Facebook Live Stream Video'
                        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoContent)}&width=640&height=360&show_text=false&autoplay=1`}
                        width='1640'
                        height='700'
                        style={{
                            border: 'none',
                            overflow: 'hidden',
                            transform: `none`,
                        }}
                        scrolling='no'
                        frameBorder='0'
                        allowFullScreen={true}
                        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                    ></iframe>
                );
            }
        } else {
            return <strong>We are Not Broadcasting Live Currently</strong>;
        }
    };

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
                                        <strong>Theme: </strong>{LiveStreamPost.theme}
                                    </h4>
                                    {renderVideoContent(LiveStreamPost.videoContent, LiveStreamPost.createdAt)}
                                    {/* Embed the iframe directly from videoContent */}
                                    <p className="card-text">{LiveStreamPost.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            

            {/* Pagination
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
            </nav> */}
        </div>
    );
}

export default LiveStream;
