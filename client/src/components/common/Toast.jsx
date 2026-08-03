import { useEffect } from 'react';

function Toast({ show, message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgClass = {
    success: 'bg-success',
    error: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info'
  }[type] || 'bg-success';

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div className={`toast show ${bgClass} text-white`} role="alert">
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
