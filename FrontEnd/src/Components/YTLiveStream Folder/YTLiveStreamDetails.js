import React, { useState } from 'react';
import axios from 'axios';
import formatDate from '../formatDate';

const YTLiveStreamDetails = ({ LiveStreamPost, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...LiveStreamPost });

    const handleClick = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/livestreamposts/${LiveStreamPost._id}`);
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
            await axios.put(`http://localhost:4000/api/livestreamposts/${LiveStreamPost._id}`, editedPost);
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
                        name="Theme"
                        value={editedPost.theme}
                        onChange={handleInputChange}
                    />
                    <label>full Youtube Embedment Url:</label>
                    <input
                        type="text"
                        name="full Youtube Embedment Url"
                        value={editedPost.videoContent}
                        onChange={handleInputChange}
                    />                    
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h4><strong>Theme: </strong>{LiveStreamPost.theme}</h4>
                    <div dangerouslySetInnerHTML={{ __html: LiveStreamPost.videoContent }} />
                    {/* Embed the iframe directly from videoContent */}
                    <p>{ formatDate(LiveStreamPost.createdAt) }</p>
                    <button className="btn btn-danger" onClick={handleClick}>Delete Post</button>
                    {'\u00A0'}
                    <button className="btn btn-secondary" onClick={handleEdit}>Edit Post</button>
                    <hr />
                </>
            )}
        </div>
    );
}

export default YTLiveStreamDetails;
