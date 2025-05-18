
import React, { useState } from 'react';
import axios from 'axios';
import formatDate from '../formatDate';

const FBLiveStreamDetails = ({ LiveStreamPost, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...LiveStreamPost });
    // const [videoUrl, setVideoUrl] = useState('');

    const handleClick = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/fblivestreamposts/${LiveStreamPost._id}`);
            onDelete(LiveStreamPost._id);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/api/fblivestreamposts/${LiveStreamPost._id}`, editedPost);
            onUpdate(editedPost);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedPost({ ...LiveStreamPost });
    };

    const handleInputChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    
    return (
        <div className="LiveStream-details" style={{ marginTop: "10px" }}>
            {isEditing ? (
                <>
                    <label>Theme:</label>
                    <input
                        type="text"
                        name="theme"
                        value={editedPost.theme}
                        onChange={handleInputChange}
                    />
                    <label>Facebook Live Stream URL:</label>
                    <input
                        type="text"
                        name="videoContent"
                        value={editedPost.videoContent}
                        onChange={handleInputChange}
                    />                    
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h4><strong>Theme: </strong>{LiveStreamPost.theme}</h4>
                    <div>
                        {/* Facebook Embedded Video Player */}
                        <iframe
                          id='facebookstream'
                          title='Facebook Live Stream Video'
                          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
                            LiveStreamPost.videoContent
                          )}&width=640&height=360&show_text=false&autoplay=1`}
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
                    </div>
                    <p className="card-text">{formatDate(LiveStreamPost.createdAt)}</p>
                    <button className="btn btn-danger" onClick={handleClick}>Delete Post</button>
                    {'\u00A0'}
                    <button className="btn btn-secondary" onClick={handleEdit}>Edit Post</button>
                    <hr />
                </>
            )}
        </div>
    );
}

export default FBLiveStreamDetails;
