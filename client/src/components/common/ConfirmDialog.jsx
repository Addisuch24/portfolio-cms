import Modal from './Modal';

function ConfirmDialog({ 
  show, 
  onHide, 
  onCancel, 
  onConfirm, 
  title = "Confirm", 
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger"
}) {
  const handleCancel = onCancel || onHide;

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn btn-secondary" onClick={handleCancel}>
            {cancelText}
          </button>
          <button className={`btn btn-${variant}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </>
      }
    >
      <p>{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;
