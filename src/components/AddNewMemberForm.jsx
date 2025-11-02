function AddNewMemberForm({ value, onChange, onAdd, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-md mx-auto">
      <p className="text-xl sm:text-2xl font-bold">Add new</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <input
            type="email"
            id="email"
            value={value}
            onChange={onChange}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="Email"
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

export default AddNewMemberForm;
