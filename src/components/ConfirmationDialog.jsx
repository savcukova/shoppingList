function ConfirmationDialog({ open, actionType, onConfirm, onCancel }) {
  const title = actionType === "delete" ? "Delete list?" : "Archive list?";
  const confirmText = actionType === "delete" ? "Delete" : "Archive";
  const confirmButtonClass =
    actionType === "delete" ? "btn-error" : "btn-primary";

  if (!open) {
    return null;
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-auto max-w-xs">
        <h3 className="font-bold text-lg text-center mb-4">{title}</h3>

        <div className="modal-action justify-center space-x-2">
          <button onClick={onCancel} className="btn btn-ghost">
            Cancel
          </button>
          <button onClick={onConfirm} className={`btn ${confirmButtonClass}`}>
            {confirmText}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onCancel}>close</button>
      </form>
    </dialog>
  );
}

export default ConfirmationDialog;
