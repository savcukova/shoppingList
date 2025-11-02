function AddNewMemberButton({ onClick }) {
  return (
    <button
      className="
      btn btn-primary btn-md px-24"
      onClick={onClick}
    >
      +Add new
    </button>
  );
}

export default AddNewMemberButton;
