import Item from "./Item.jsx";

function ItemList({ items, onCheck, onDeleteItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onCheck={onCheck}
          onDelete={onDeleteItem}
        />
      ))}
    </ul>
  );
}

export default ItemList;
