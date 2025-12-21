import { useLanguage } from "../contexts/LanguageContext.jsx";

function EditListForm({
  value,
  onChange,
  onSave,
  onCancel,
  isOwner,
  onMembers,
}) {
  const { t } = useLanguage();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-md mx-auto">
      <p className="text-xl sm:text-2xl font-bold">{t("editList")}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <label htmlFor="listName" className="label">
            <span className="label-text text-sm font-medium text-base-content text-opacity-80">
              {t("listName")}
            </span>
          </label>

          <input
            type="text"
            id="listName"
            value={value}
            onChange={onChange}
            className="input input-bordered w-full text-sm sm:text-base"
          />
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="btn btn-primary btn-sm sm:btn-md w-full"
          >
            {t("save")}
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={onMembers}
              className="btn bg-base-200 btn-sm sm:btn-md w-full"
            >
              {t("manageOtherUsers")}
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="btn bg-base-200 btn-sm sm:btn-md w-full"
          >
            {t("cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditListForm;
