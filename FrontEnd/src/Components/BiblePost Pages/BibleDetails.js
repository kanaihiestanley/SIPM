import React from 'react';
import { useState } from "react";
import axios from "axios";

const BibleDetails = ({ BiblePost, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedPost, setEditedPost] = useState({ ...BiblePost });

    const handleClick = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/sipmRoute/${BiblePost._id}`);
            onDelete(BiblePost._id);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await axios.patch(`http://localhost:4000/api/sipmRoute/${BiblePost._id}`, editedPost);
            onUpdate(editedPost);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedPost({ ...BiblePost });
    };

    const handleInputChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    return (
        <div className="Bible-details" style={{ marginTop: "10px" }}>
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
                    <label>Bible Verse:</label>
                     <input
                         type="text"
                         name="bibleVerse"
                         value={editedPost.bibleVerse}
                         onChange={handleInputChange}
                     />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{BiblePost.title}</h4>
                    <p><strong>Description: </strong>{BiblePost.description}</p>
                    <p><strong>Bible Verse: </strong>{BiblePost.bibleVerse}</p>
                    <p>{BiblePost.createdAt}</p>
                    <button className="btn btn-danger" onClick={handleClick}>Delete Post</button>

                    { '\u00A0' } {/* used as an alternative to &nbsp*/}

                    <button className="btn btn-secondary" onClick={handleEdit}>Edit Post</button>
                    <hr />
                </>
            )}
        </div>
    );
}

export default BibleDetails;

















