function AddListForm({ value, onChange, onAdd, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <div className="flex-col space-y-4 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <p className="text-xl sm:text-2xl font-bold">Add new</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <label htmlFor="listName" className="label">
            <span className="label-text text-sm sm:text-base">List name</span>
          </label>
          <input
            type="text"
            id="listName"
            value={value}
            onChange={onChange}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="All I need"
          />
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="btn btn-primary btn-sm sm:btn-md w-full"
          >
            Add
          </button>

          <button
            type="button"
            className="btn bg-base-200 btn-sm sm:btn-md w-full"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddListForm;
