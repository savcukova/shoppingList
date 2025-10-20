import { useState } from "react";

function AddNewForm({
  onAdd,
  onCancel,
  inputType = "text",
  inputLabel = "Item name",
}) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    onAdd(value.trim());
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="item">{inputLabel}</label>
      <input
        id="item"
        type={inputType}
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      />

      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default AddNewForm;
