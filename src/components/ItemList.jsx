import Item from "./Item.jsx";

function ItemList({ items, onCheck, onDelete }) {
  return (
    <ul>
      {items.map((item) => (
        <Item key={item.id} item={item} onCheck={onCheck} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ItemList;
