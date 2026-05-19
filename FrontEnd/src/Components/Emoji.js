// src/components/Emoji.js
import React from 'react';

const Emoji = ({ label, children, className = '' }) => {
  return (
    <span 
      role="img" 
      aria-label={label}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  );
};

export default Emoji;