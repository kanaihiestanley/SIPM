// import React, { useState } from "react";
// import { useBiblePostContext } from "./hooks/useBiblePostContext";
// import axios from "axios";

// const NewEditPost = ({ BiblePost }) => {
//     const { dispatch } = useBiblePostContext();
//     const [editedPost, setEditedPost] = useState({ ...BiblePost });

//     const handleSave = async () => {
//         try {
//             await axios.patch(`http://localhost:4000/api/sipmRoute/${BiblePost._id}`, editedPost);
//             dispatch({ type: 'UPDATE_BIBLEPOST', payload: editedPost });
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="edit-post">
//             <label>Title:</label>
//             <input
//                 type="text"
//                 name="title"
//                 value={editedPost.title}
//                 onChange={handleInputChange}
//             />
//             <label>Description:</label>
//             <input
//                 type="text"
//                 name="description"
//                 value={editedPost.description}
//                 onChange={handleInputChange}
//             />
//             <label>Bible Verse:</label>
//             <input
//                 type="text"
//                 name="bibleVerse"
//                 value={editedPost.bibleVerse}
//                 onChange={handleInputChange}
//             />
//             <button onClick={handleSave}>Save</button>
//         </div>
//     );
// };

// export default NewEditPost;





// import React, { useState } from "react";
// import { useBiblePostContext } from "./hooks/useBiblePostContext";
// import axios from "axios";

// const NewEditPost = ({ BiblePost }) => {
//     const { dispatch } = useBiblePostContext();
//     const [editedPost, setEditedPost] = useState({ ...BiblePost });

//     const handleSave = async () => {
//         try {
//             await axios.patch(`http://localhost:4000/api/sipmRoute/${BiblePost._id}`, editedPost);
//             dispatch({ type: 'UPDATE_BIBLEPOST', payload: { id: BiblePost._id, updatedPost: editedPost } });
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };

//     const handleInputChange = (e) => {
//         setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="edit-post">
//             <label>Title:</label>
//             <input
//                 type="text"
//                 name="title"
//                 value={editedPost.title}
//                 onChange={handleInputChange}
//             />
//             <label>Description:</label>
//             <input
//                 type="text"
//                 name="description"
//                 value={editedPost.description}
//                 onChange={handleInputChange}
//             />
//             <label>Bible Verse:</label>
//             <input
//                 type="text"
//                 name="bibleVerse"
//                 value={editedPost.bibleVerse}
//                 onChange={handleInputChange}
//             />
//             <button onClick={handleSave}>Save</button>
//         </div>
//     );
// };

// export default NewEditPost;



// import React, { useState } from "react";
// import { useBiblePostContext } from "./hooks/useBiblePostContext";
// import axios from "axios";

// const NewEditPost = ({ BiblePost }) => {
//     const { dispatch } = useBiblePostContext();
//     const [editedPost, setEditedPost] = useState({ ...BiblePost });

//     const handleSave = async () => {
//         try {
//             const response = await axios.patch(`http://localhost:4000/api/sipmRoute/${BiblePost._id}`, editedPost);
            
//             if (response.status === 200) {
//                 dispatch({ type: 'UPDATE_BIBLEPOST', payload: { id: BiblePost._id, updatedPost: editedPost } });
//                 console.log('Post updated successfully!');
//             } else {
//                 console.error('Error updating data. Unexpected response status:', response.status);
//             }
//         } catch (error) {
//             console.error('Error updating data:', error);
//         }
//     };
    

//     const handleInputChange = (e) => {
//         setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="edit-post">
//             <label>Title:</label>
//             <input
//                 type="text"
//                 name="title"
//                 value={editedPost.title}
//                 onChange={handleInputChange}
//             />
//             <label>Description:</label>
//             <input
//                 type="text"
//                 name="description"
//                 value={editedPost.description}
//                 onChange={handleInputChange}
//             />
//             <label>Bible Verse:</label>
//             <input
//                 type="text"
//                 name="bibleVerse"
//                 value={editedPost.bibleVerse}
//                 onChange={handleInputChange}
//             />
//             <button onClick={handleSave}>Save</button>
//         </div>
//     );
// };

// export default NewEditPost;




import React, { useState } from "react";
import { useBiblePostContext } from "./hooks/useBiblePostContext";
import axios from "axios";

const NewEditPost = ({ BiblePost }) => {
    const { dispatch } = useBiblePostContext();
    const [editedPost, setEditedPost] = useState({ ...BiblePost });

    const handleSave = async () => {
        try {
            await axios.patch(`http://localhost:4000/api/sipmRoute/${_id}`, editedPost);
            dispatch({ type: 'UPDATE_BIBLEPOST', payload: { id: BiblePost._id, updatedPost: editedPost } });
            console.log('Post updated successfully!');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleInputChange = (e) => {
        setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
    };

    return (
        <div className="edit-post">
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
        </div>
    );
};

export default NewEditPost;
