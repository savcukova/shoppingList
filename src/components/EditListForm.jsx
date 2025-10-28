function EditListForm({
  value,
  onChange,
  onSave,
  onCancel,
  isOwner,
  onMembers,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="p-4 space-y-6">
      <p className="text-2xl font-bold">Edit list</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <label htmlFor="listName" className="label">
            <span className="label-text text-sm font-medium text-base-content text-opacity-80">
              List name
            </span>
          </label>

          <input
            type="text"
            id="listName"
            value={value}
            onChange={onChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="pt-2 space-y-2">
          <button type="submit" className="btn btn-primary btn-md w-full">
            Save
          </button>
          {isOwner && (
            <button
              type="button"
              onClick={onMembers}
              className="btn bg-base-200 btn-md w-full"
            >
              Manage other users
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="btn bg-base-200 btn-md w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditListForm;
