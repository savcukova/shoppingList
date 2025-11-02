import Item from "./Item.jsx";

function ItemList({ items, onCheck, onDeleteItem }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No items</p>
      </div>
    );
  }

  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item._id}
          item={item}
          onCheck={() => onCheck(item._id)}
          onDelete={() => onDeleteItem(item._id)}
        />
      ))}
    </ul>
  );
}

export default ItemList;
