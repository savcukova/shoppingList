function AddNewItemButton({ onClick }) {
  return (
    <button
      className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
      onClick={onClick}
    >
      +Add new
    </button>
  );
}

export default AddNewItemButton;
