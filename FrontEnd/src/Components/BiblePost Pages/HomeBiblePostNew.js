// import React from 'react';
// import { useEffect, useState } from "react";
// import axios from 'axios'; 
// import OtherHeaderContent from "../OtherHeaderContent";
// import Notification from '../Notification'; // Import your Notification component
// // import CreateBiblePost from "./CreateBiblePost";
// // import BibleDetails from "./BibleDetails";




// const HomeBiblePost = ({ addBiblePost, BiblePost, onDelete, onUpdate }) => {
//     const [BiblePosts, setBiblePosts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const postsPerPage = 5; // Number of posts to display per page
//     const [newPost, setNewPost] = useState({ title: '', description: '', bibleVerse: '' });
//     const [showNotification, setShowNotification] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedPost, setEditedPost] = useState({ ...BiblePost });



//     //TO RETRIVE ALL DATA
//     useEffect(() => {
//         axios.get('http://localhost:4000/api/sipmRoute/')
//             .then((response) => {
//                 setBiblePosts(response.data);
//             })
//             .catch((error) => {
//               console.error('Error fetching data:', error);
//             });
//         }, []);


//         //TO CREATE NEW POST
//         addBiblePost = async (newPost) => {
//             try {
//               const response = await axios.post('http://localhost:4000/api/sipmRoute/', newPost);
//               if (response.status === 201) {
//                 setNewPost([...newPost, response.data]);
//               }
//             } catch (error) {
//               console.error('Error creating data:', error);
//             }
//           };
          
//         const handleButtonClick = () => {
//             setShowNotification(true);
//         };



//         //NOTIFICATION WHEN NEW POST IS SUCCESSFULLY CREATED
//         const handleSubmit = async (e) => {
//             e.preventDefault();
//             try {
//               await addBiblePost(newPost);
//               setShowNotification(true); // Set showNotification to true after successfully creating the post
//               setNewPost({ title: '', description: '', bibleVerse: '' });
//             } catch (error) {
//               console.error('Error creating data:', error);
//             }
//           };


//         //TO DELETE POST
//         const handleClick = async () => {
//             try {
//                 await axios.delete(`http://localhost:4000/api/Bibleposts/${BiblePost._id}`);
//                 onDelete(BiblePost._id);
//             } catch (error) {
//                 console.error('Error deleting data:', error);
//             }
//         };
//         const handleDelete = async (postId) => {
//             const isConfirmed = window.confirm('Are you sure you want to delete this post?');
//             if (isConfirmed) {
//               try {
//                 await axios.delete(`http://localhost:4000/api/Bibleposts/${postId}`);
//                 setBiblePosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//               } catch (error) {
//                 console.error('Error deleting post:', error);
//               }
//             } else {
//               console.log('Deletion canceled');
//             }
//           };
        

//           //TO UPDATE POST
//           const handleEdit = () => {
//             setIsEditing(true);
//         };
    
//         const handleSave = async () => {
//             try {
//                 await axios.put(`http://localhost:4000/api/Bibleposts/${BiblePost._id}`, editedPost);
//                 onUpdate(editedPost);
//                 setIsEditing(false);
//             } catch (error) {
//                 console.error('Error updating data:', error);
//             }
//         };
    
//         const handleCancel = () => {
//             setIsEditing(false);
//             setEditedPost({ ...BiblePost });
//         };
    
//         const handleInputChange = (e) => {
//             setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
//         };

//         const handleUpdate = (updatedPost) => {
//         setBiblePosts((prevPosts) =>
//             prevPosts.map((post) =>
//             post._id === updatedPost._id ? updatedPost : post
//             )
//         );
//         };
        
//           // Calculate the indexes for the current page
//           const indexOfLastPost = currentPage * postsPerPage;
//           const indexOfFirstPost = indexOfLastPost - postsPerPage;
//           const currentPosts = BiblePosts.slice(indexOfFirstPost, indexOfLastPost);
        
//           // Change page
//           const paginate = (pageNumber) => setCurrentPage(pageNumber);
        
//           return (
//             <div className='row' style={{ padding: '10px', margin: '5px' }}>
        
//               <OtherHeaderContent />
        
        
//               <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3  bg-info' style={{paddingTop: "50px"}}>
//                 <h2><strong>Bible Management Console</strong></h2>
//                 <div className="BiblePosts">
//                   {currentPosts.map((BiblePost) => (
//                     <BibleDetails
//                       BiblePost={BiblePost}
//                       key={BiblePost._id}
//                       onDelete={handleDelete}
//                       onUpdate={handleUpdate}
//                     />
//                   ))}
//                 </div>
        
//                 {/* Pagination */}
//                 <nav aria-label="Page navigation example">
//                   <ul className="pagination">
//                     {Array.from({ length: Math.ceil(BiblePosts.length / postsPerPage) }).map((_, index) => (
//                       <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
//                         <button className="page-link" onClick={() => paginate(index + 1)}>
//                           {index + 1}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </nav>
//               </div>
        
//             <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 pe-3 bg-info'>
//             {isEditing ? (
//                 <>
//                     <form onSubmit={handleSubmit} container>
//                     <div className="mb-3">
//                         <h3>Create New Post</h3>
//                         <label htmlFor="title" className="form-label">
//                         Title
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control form-control-sm"                        
//                             name="title"
//                             value={editedPost.title}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label">
//                             Description
//                         </label>
//                         <textarea
//                             className="form-control form-control-sm"
//                             id="description"
//                             type="text"
//                             name="description"
//                             value={editedPost.description}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="bibleVerse" className="form-label">
//                             Bible Verse
//                         </label>
//                         <input
//                             type="text"
//                             className="form-control form-control-sm"
//                             id="bibleVerse"
//                             name="bibleVerse"
//                             value={editedPost.bibleVerse}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     <button onClick={handleSave}>Save</button>
//                     <button onClick={handleCancel}>Cancel</button>
//                     <button onClick={handleButtonClick}></button>
//                     {showNotification && (
//                         <Notification
//                         message = {`${newPost.title} have been created successfully now`}
//                         //message="This is a notification message!"
//                         type="success" // You can change this to "error" for an error message
//                         onClose={() => setShowNotification(false)}
//                         />
//                     )}
//                 </form>

//                 </>
//             ) : (
//                 <>
                




//                 <form onSubmit={handleSubmit} container>
//                     <div className="mb-3">
//                         <h3>Create New Post</h3>
//                         <label htmlFor="title" className="form-label">
//                         Title
//                         </label>
//                         <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         id="title"
//                         value={newPost.title}
//                         onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="description" className="form-label">
//                         Description
//                         </label>
//                         <textarea
//                         className="form-control form-control-sm"
//                         id="description"
//                         value={newPost.description}
//                         onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="bibleVerse" className="form-label">
//                         Bible Verse
//                         </label>
//                         <input
//                         type="text"
//                         className="form-control form-control-sm"
//                         id="bibleVerse"
//                         value={newPost.bibleVerse}
//                         onChange={(e) => setNewPost({ ...newPost, bibleVerse: e.target.value })}
//                         />
//                     </div>
//                     <button type="submit" onClick={handleButtonClick} message = {`${newPost.title} have been created successfully`} className="btn btn-primary alert-success" style={{textShadow: '2px 2px 0 #000'}}>
//                         Create
//                     </button>
//                     <button onClick={handleButtonClick}></button>
//                     {showNotification && (
//                         <Notification
//                         message = {`${newPost.title} have been created successfully now`}
//                         //message="This is a notification message!"
//                         type="success" // You can change this to "error" for an error message
//                         onClose={() => setShowNotification(false)}
//                         />
//                     )}
//                 </form>
//                 </>
//             )}
//               </div>
//             </div>
//           );
//         };
// export default HomeBiblePost;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OtherHeaderContent from '../OtherHeaderContent';
import Notification from '../Notification'; // Import your Notification component
import BibleDetails from './BibleDetails'; // Import BibleDetails component
import CreateBiblePost from './CreateBiblePost'; // Import CreateBiblePost component

const HomeBiblePostNew = () => {
  const [BiblePosts, setBiblePosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page
  const [newPost, setNewPost] = useState({ title: '', description: '', bibleVerse: '' });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

  // TO RETRIEVE ALL DATA
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/sipmRoute/')
      .then((response) => {
        setBiblePosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // TO CREATE NEW POST
  const addBiblePost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:4000/api/sipmRoute/', newPost);
      if (response.status === 201) {
        setBiblePosts([...BiblePosts, response.data]);
        setNotificationMessage('Post created successfully');
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBiblePost(newPost);
    setNewPost({ title: '', description: '', bibleVerse: '' });
  };

  // TO DELETE POST
  const handleDelete = async (postId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/sipmRoute/:id`, postId);
        setBiblePosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // TO UPDATE POST
  const handleEdit = (post) => {
    setIsEditing(true);
    setEditedPost(post);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:4000/api/sipmRoute/:id`, editedPost);
      setBiblePosts((prevPosts) =>
        prevPosts.map((post) => (post._id === editedPost._id ? editedPost : post))
      );
      setIsEditing(false);
      setNotificationMessage('Post updated successfully');
      setShowNotification(true);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPost(null);
  };

  const handleInputChange = (e) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };


//   const handleSave = async () => {
//     try {
//       await axios.patch(`http://localhost:4000/api/Bibleposts/:id`, editedPost);
//       setBiblePosts((prevPosts) =>
//         prevPosts.map((post) => (post._id === editedPost._id ? editedPost : post))
//       );
//       setIsEditing(false);
//       setNotificationMessage('Post updated successfully');
//       setShowNotification(true);
//     } catch (error) {
//       console.error('Error updating data:', error);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//     setEditedPost(null);
//   };

//   const handleInputChange = (e) => {
//     setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
//   };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = BiblePosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row' style={{ padding: '10px', margin: '5px' }}>
      <OtherHeaderContent />

      <div className='col-xl-8 col-lg-8 col-md-6 col-sm-12 pe-3 bg-info' style={{ paddingTop: '50px' }}>
        <h2>
          <strong>Bible Management Console</strong>
        </h2>
        <div className="BiblePosts">
          {currentPosts.map((BiblePost) => (
            <BibleDetails
              BiblePost={BiblePost}
              key={BiblePost._id}
              onDelete={handleDelete}
              onEdit={handleEdit}
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
        {isEditing ? (
          <div>
            <h3>Edit Post</h3>
            <form onSubmit={handleSave} container> 
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="title"
                  value={editedPost.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control form-control-sm"
                  name="description"
                  value={editedPost.description}
                  onChange={handleInputChange}
                  style={{ whiteSpace: 'pre-wrap' }} // Ensure text wraps properly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bibleVerse" className="form-label">
                  Bible Verse
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  name="bibleVerse"
                  value={editedPost.bibleVerse}
                  onChange={handleInputChange}
                />
              </div>
              <button type="button" onClick={handleSave} className="btn btn-primary">
                Save
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <CreateBiblePost
            newPost={newPost}
            setNewPost={setNewPost}
            handleSubmit={handleSubmit}
          />
        )}
      </div>

      {showNotification && (
        <Notification
          message={notificationMessage}
          type="success"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default HomeBiblePostNew;
