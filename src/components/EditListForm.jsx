// formular k editování seznamu
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
    <>
      <div>
        <p>Edit list</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="listName">List name</label>
        <input type="text" id="listName" value={value} onChange={onChange} />

        <button type="submit">Save</button>
        {isOwner && (
          <button type="button" onClick={onMembers}>
            Manage other users
          </button>
        )}
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default EditListForm;
