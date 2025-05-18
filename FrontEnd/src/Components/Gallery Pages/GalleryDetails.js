import React from 'react';
import { useState } from "react";
import axios from "axios";

const GalleryDetails = ({ GalleryPost, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...GalleryPost });

    const handleClick = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/galleryposts/${GalleryPost._id}`);
            onDelete(GalleryPost._id);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/api/galleryposts/${GalleryPost._id}`, editedPost);
            onUpdate(editedPost);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedPost({ ...GalleryPost });
    };

    const handleInputChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    return (
        <div className="Gallery-details" style={{ marginTop: "10px" }}>
            {isEditing ? (
                <>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={editedPost.title}
                        onChange={handleInputChange}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={editedPost.description}
                        onChange={handleInputChange}
                    />
                    <label>Image Upload:</label>
                    <input
                        type="file"
                        name="GalleryVerse"
                        value={editedPost.GalleryVerse}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h4><strong>Title: </strong>{GalleryPost.title}</h4>
                    <p><strong>Description: </strong>{GalleryPost.description}</p>
                    {GalleryPost.imageUrl && (
                         <img src={`http://localhost:4000/images/${GalleryPost.imageUrl}`} alt="Post" style={{ maxWidth: '100%' }} />
                    )}
                    {/* <p><strong>Image Upload: </strong>{GalleryPost.imageUrl}</p> */}
                    <p>{GalleryPost.createdAt}</p>
                    <button className="btn btn-danger" onClick={handleClick}>Delete Post</button>

                     { '\u00A0' } {/* used as an alternative to &nbsp*/}
                     
                    <button className="btn btn-secondary" onClick={handleEdit}>Edit Post</button>
                    <hr />
                </>
            )}
        </div>
    );
}

export default GalleryDetails;

















