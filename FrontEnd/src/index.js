// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BiblePostContextProvider } from './Components/content/BiblePostContext';
// import { GalleryPostContext } from './Components/content/GalleryPostContext';
// import ErrorBoundary from './ErrorBoundary'; // Adjust the import path accordingly



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BiblePostContextProvider>
//       <GalleryPostContext>
//         <App />
//       </GalleryPostContext>      
//     </BiblePostContextProvider>    
//   </React.StrictMode>
// );


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { BiblePostContextProvider } from './Components/content/BiblePostContext';
// import { GalleryPostContextProvider } from './Components/content/GalleryPostContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {process.env.REACT_APP_USE_GALLERY_CONTEXT === 'true' ? (
//       <GalleryPostContextProvider>
//         <App />
//       </GalleryPostContextProvider>
//     ) : (
//       <BiblePostContextProvider>
//         <App />
//       </BiblePostContextProvider>
//     )}
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { BiblePostContextProvider } from './Components/content/BiblePostContext';
// import { GalleryPostContextProvider } from './Components/content/GalleryPostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>   
      
        <App />
   
   
  </React.StrictMode>
);
