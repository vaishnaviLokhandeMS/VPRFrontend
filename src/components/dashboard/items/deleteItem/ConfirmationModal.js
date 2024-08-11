import React from 'react';
import './ConfirmationModal.css'; // You'll need to style the modal

const ConfirmationModal = ({ show, onClose, onConfirm, title, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-confirm-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-cancel-button" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
