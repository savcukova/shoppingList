function ConfirmationDialog({ open, actionType, onConfirm, onCancel }) {
  const getDialogContent = () => {
    switch (actionType) {
      case "delete":
        return {
          title: "Delete list?",
          confirmText: "Delete",
          confirmButtonClass: "btn-error",
        };
      case "archive":
        return {
          title: "Archive list?",
          confirmText: "Archive",
          confirmButtonClass: "btn-primary",
        };
      case "remove":
        return {
          title: "Delete user?",
          confirmText: "Delete",
          confirmButtonClass: "btn-error",
        };
      default:
        return {
          title: "Confirm?",
          confirmText: "Confirm",
          confirmButtonClass: "btn-primary",
        };
    }
  };

  const { title, confirmText, confirmButtonClass } = getDialogContent();

  if (!open) {
    return null;
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-auto max-w-xs">
        <h3 className="font-bold text-lg text-center mb-4">{title}</h3>

        <div className="modal-action justify-center space-x-2">
          {actionType === "remove" ? (
            <>
              <button
                onClick={onConfirm}
                className={`btn ${confirmButtonClass}`}
              >
                {confirmText}
              </button>
              <button onClick={onCancel} className="btn btn-ghost">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={onCancel} className="btn btn-ghost">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`btn ${confirmButtonClass}`}
              >
                {confirmText}
              </button>
            </>
          )}
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onCancel}>close</button>
      </form>
    </dialog>
  );
}

export default ConfirmationDialog;
