import React, { useState } from "react";
import ItemList from "../components/ItemList.jsx";
import AddNewForm from "../components/AddNewForm.jsx";

const initialList = {
  name: "Nákupní seznam",
  items: [
    { id: 1, name: "Mléko", done: false },
    { id: 2, name: "Chléb", done: true },
    { id: 3, name: "Vejce", done: false },
  ],
};

function ListDetailPage() {
  const [list, setList] = useState(initialList);

  const handleCheck = (id) => {
    setList({
      ...list,
      items: list.items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      ),
    });
  };

  const handleDelete = (id) => {
    setList({
      ...list,
      items: list.items.filter((item) => item.id !== id),
    });
  };

  const handleAdd = (name) => {
    const newItem = {
      id: Date.now(),
      name,
      done: false,
    };
    setList({
      ...list,
      items: [...list.items, newItem],
    });
  };

  const handleCancel = () => {
    console.log("Přidávání zrušeno");
  };
  return (
    <>
      <ItemList
        items={list.items}
        onCheck={handleCheck}
        onDelete={handleDelete}
      />
      <AddNewForm onAdd={handleAdd} onCancel={handleCancel} />
    </>
  );
}

export default ListDetailPage;
