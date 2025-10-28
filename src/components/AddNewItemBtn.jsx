function AddNewItemButton({ onClick }) {
  return (
    <button
      className="
      btn btn-primary btn-md"
      onClick={onClick}
    >
      +Add new
    </button>
  );
}

export default AddNewItemButton;
