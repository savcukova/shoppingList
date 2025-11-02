function ConfirmationDialog({
  open,
  actionType,
  onConfirm,
  onCancel,
  title: customTitle,
}) {
  const getDialogContent = () => {
    switch (actionType) {
      case "delete":
        return {
          title: customTitle || "Delete list?",
          confirmText: "Delete",
          confirmButtonClass: "btn-error",
        };
      case "archive":
        return {
          title: customTitle || "Archive list?",
          confirmText: "Archive",
          confirmButtonClass: "btn-primary",
        };
      case "remove":
        return {
          title: customTitle || "Delete user?",
          confirmText: "Delete",
          confirmButtonClass: "btn-error",
        };
      default:
        return {
          title: customTitle || "Confirm?",
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
      <div className="modal-box w-auto max-w-xs sm:max-w-sm">
        <h3 className="font-bold text-base sm:text-lg text-center mb-4">
          {title}
        </h3>

        <div className="modal-action justify-center space-x-2">
          {actionType === "remove" ? (
            <>
              <button
                onClick={onConfirm}
                className={`btn btn-sm sm:btn-md ${confirmButtonClass}`}
              >
                {confirmText}
              </button>
              <button
                onClick={onCancel}
                className="btn btn-sm sm:btn-md btn-ghost"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="btn btn-sm sm:btn-md btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`btn btn-sm sm:btn-md ${confirmButtonClass}`}
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
