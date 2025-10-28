function AddNewForm({ value, onChange, onAdd, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd();
  };

  return (
    <>
      <div>
        <p>Add new</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="itemName">Item name</label>
        <input type="text" id="itemName" value={value} onChange={onChange} />

        <button
          type="submit"
          className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-neutral btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default AddNewForm;
