function AddNewItemButton({ onClick }) {
  return (
    <button
      className="btn btn-primary btn-sm sm:btn-md px-8 sm:px-16 md:px-24 w-full sm:w-auto"
      onClick={onClick}
    >
      +Add new
    </button>
  );
}

export default AddNewItemButton;
