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

        <button type="submit">Add</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default AddNewForm;
