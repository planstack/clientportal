import React, { useEffect, useRef } from 'react';

interface ProfilePopoverProps {
  show: boolean;
  onHide: () => void;
  onLogout: () => void;
}

const ProfilePopover: React.FC<ProfilePopoverProps> = ({ show, onHide, onLogout }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div 
      className="profile-popover" 
      ref={popoverRef}
      style={{
        borderRadius: '10px',
        boxShadow: '0 0 10px 4px #ccc',
        background: 'white',
        padding: '10px',
        position: 'fixed',
        bottom: '30px',
        left: '20px',
        zIndex: 1001,
      }}
    >
      <div className="profile-option" onClick={onHide}>
        <i className="bi bi-person me-2"></i>
        User Profile
      </div>
      <div className="profile-option" onClick={onLogout}>
        <i className="bi bi-box-arrow-right me-2"></i>
        Log Out
      </div>
    </div>
  );
};

export default ProfilePopover;