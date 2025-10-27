function ConfirmationDialog({ open, actionType, onConfirm, onCancel }) {
  const title = actionType === "delete" ? "Delete list?" : "Archive list?";
  const confirmText = actionType === "delete" ? "Delete" : "Archive";

  if (!open) {
    return null;
  }

  return (
    <div>
      <p>{title}</p>
      <button onClick={onConfirm}>{confirmText}</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default ConfirmationDialog;
