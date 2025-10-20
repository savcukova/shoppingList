//import React, { useState } from "react";
import Item from "../components/Item.jsx";

const initialList = {
  name: "Nákupní seznam",
  items: [
    { id: 1, name: "Mléko", done: false },
    { id: 2, name: "Chléb", done: true },
    { id: 3, name: "Vejce", done: false },
  ],
};

function ListDetailPage() {
  return (
    <ul>
      {initialList.items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onCheck={() => {}}
          onDelete={() => {}}
        />
      ))}
    </ul>
  );
}

export default ListDetailPage;
