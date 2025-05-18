import React, { useState, useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Close the notification after 3 seconds (adjust as needed)

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  ) : null;
};

export default Notification;
