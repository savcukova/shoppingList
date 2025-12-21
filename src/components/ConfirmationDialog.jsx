import { useLanguage } from "../contexts/LanguageContext.jsx";

function ConfirmationDialog({
  open,
  actionType,
  onConfirm,
  onCancel,
  title: customTitle,
}) {
  const { t } = useLanguage();
  
  const getDialogContent = () => {
    switch (actionType) {
      case "delete":
        return {
          title: customTitle || t("deleteList"),
          confirmText: t("delete"),
          confirmButtonClass: "btn-error",
        };
      case "archive":
        return {
          title: customTitle || t("archiveList"),
          confirmText: t("archive"),
          confirmButtonClass: "btn-primary",
        };
      case "remove":
        return {
          title: customTitle || t("removeMember"),
          confirmText: customTitle?.includes(t("leaveList")) ? t("leaveList") : t("delete"),
          confirmButtonClass: "btn-error",
        };
      default:
        return {
          title: customTitle || t("confirm") + "?",
          confirmText: t("confirm"),
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
                {t("cancel")}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onCancel}
                className="btn btn-sm sm:btn-md btn-ghost"
              >
                {t("cancel")}
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
        <button onClick={onCancel}>{t("close")}</button>
      </form>
    </dialog>
  );
}

export default ConfirmationDialog;
