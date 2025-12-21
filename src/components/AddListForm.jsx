import { useLanguage } from "../contexts/LanguageContext.jsx";

function AddListForm({ value, onChange, onAdd, onCancel }) {
  const { t } = useLanguage();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-auto max-w-md">
        <h3 className="font-bold text-lg mb-4">{t("createList")}</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label htmlFor="listName" className="label">
              <span className="label-text text-sm sm:text-base">{t("listName")}</span>
            </label>
            <input
              type="text"
              id="listName"
              value={value}
              onChange={onChange}
              className="input input-bordered w-full text-sm sm:text-base"
              placeholder={t("listName")}
              autoFocus
            />
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost btn-sm sm:btn-md"
              onClick={onCancel}
            >
              {t("cancel")}
            </button>
            <button type="submit" className="btn btn-primary btn-sm sm:btn-md">
              {t("add")}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={onCancel}>{t("close")}</button>
      </form>
    </dialog>
  );
}

export default AddListForm;
