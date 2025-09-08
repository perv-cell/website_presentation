import React, { useState, useEffect } from 'react';
import '../cssmoduls/BeautifulAlertcss.css';

export default function BeautifulAlert({ message, type = 'success', onClose, show = false }){
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  if (!show && !isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💡';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'info':
        return '#2196f3';
      default:
        return '#9c27b0';
    }
  };

  return (
    <div className={`alert-overlay ${isVisible ? 'show' : ''}`}>
      <div 
        className="alert-content"
        style={{ borderLeft: `4px solid ${getBgColor()}` }}
      >
        <div className="alert-header">
          <span className="alert-icon">{getIcon()}</span>
          <button className="alert-close" onClick={handleClose}>×</button>
        </div>
        <div className="alert-message">{message}</div>
        <div 
          className="alert-progress" 
          style={{ backgroundColor: getBgColor() }}
        />
      </div>
    </div>
  );
};

