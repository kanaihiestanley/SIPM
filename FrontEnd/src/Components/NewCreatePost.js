// import { useState } from "react";
// // import { useBiblePostContext } from "./hooks/useBiblePostContext";
// import axios from "axios";


// const NewCreatePost = ({ addBiblePost }) => {
//     // const { dispatch } = useBiblePostContext()

//     const [newPost, setNewPost] = useState({ title: '', description: '', bibleVerse: '', error: null });



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           await addBiblePost(newPost);
//         //   setShowNotification(true); // Set showNotification to true after successfully creating the post
//           setNewPost({ title: '', description: '', bibleVerse: '', error: null });
//         } catch (error) {
//           console.error('Error creating data:', error);
//         }
//       };

//       //TO CREATE NEW POST
//         addBiblePost = async (newPost) => {
//             try {
//             const response = await axios.post('http://localhost:4000/api/sipmRoute/', newPost);
//             if (response.status === 201) {
//                 setNewPost([...newPost, response.data]);
//             }
//             } catch (error) {
//             console.error('Error creating data:', error);
//             }
//         };
//     // const [title, setTitle] = useState('')
//     // const [description, setDescription] = useState('')
//     // const [BibleVerse, setBibleverse] = useState('')
//     // const [error, setError] = useState(null)

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault()

//     //     const BiblePost = {title, description, BibleVerse}
        
//     //     const response = await axios.post('http://localhost:4000/api/sipmRoute/', {
//     //         method: 'POST',
//     //         body: JSON.stringify(BiblePost),
//     //         Headers: {
//     //             'Content-type': 'application/json'
//     //         }
//     //     })

//     //     const json = await response.json()

//     //     if (!response.ok){
//     //         setError(json.error)
//     //     }

//     //     if(response.ok){
//     //         setTitle('')
//     //         setDescription('')
//     //         setBibleverse('')
//     //         setError(null)
//     //         console.log("new Bible post added", json)
//     //         dispatch({type: 'CREATE_BIBLEPOST', payload: json })
//     //     }
//     // }


//     return(
//         <form className="create-form" onSubmit={handleSubmit}>
//             <h3>Add a New Post</h3>

//             <label>Bible Title</label>
//             <input type="text" onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />

//             <label>Bible Description</label>
//             <input type="text" onChange={(e) => setNewPost({ ...newPost, titdescription: e.target.value })} />

//             <label>Bible Verse</label>
//             <input type="text" onChange={(e) => setNewPost({ ...newPost, bibleVerse: e.target.value })} />
        
//             <button>Add Post</button>
//             {newPost.error && <div className="error">{newPost.error}</div>}
//         </form>
//     )


// }

// export default NewCreatePost

import React from 'react';
import { useState } from "react";
import axios from "axios";

const NewCreatePost = ({ addBiblePost }) => {
    const [newPost, setNewPost] = useState({ title: '', description: '', bibleVerse: '', error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBiblePost(newPost);
            setNewPost({ title: '', description: '', bibleVerse: '', error: null });
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };


        //TO CREATE NEW POST
        addBiblePost = async (newPost) => {
        try {
            const response = await axios.post('http://localhost:4000/api/sipmRoute/', newPost);
            if (response.status === 201) {
            setNewPost([...newPost, response.data]);
            }
        } catch (error) {
            console.error('Error creating data:', error);
        }
        };

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <h3>Add a New Post</h3>
            <label>Bible Title</label>
            <input type="text" onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
            <label>Bible Description</label>
            <input type="text" onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} />
            <label>Bible Verse</label>
            <input type="text" onChange={(e) => setNewPost({ ...newPost, bibleVerse: e.target.value })} />
            <button>Add Post</button>
            {newPost.error && <div className="error">{newPost.error}</div>}
        </form>
    );
};

export default NewCreatePost;
