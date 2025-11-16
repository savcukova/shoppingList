import ShoppingListCard from "./ShoppingListCard";

function ShoppingList({
  lists,
  currentUser,
  onSelectList,
  onDeleteList,
  onArchiveList,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {lists.map((list) => {
        const isOwner = list.owner_id === currentUser?.id;

        return (
          <ShoppingListCard
            key={list._id}
            list={list}
            isOwner={isOwner}
            onClick={() => onSelectList(list._id)}
            onDelete={() => onDeleteList(list._id)}
            onArchive={() => onArchiveList(list._id, list.is_archived)}
          />
        );
      })}
    </div>
  );
}

export default ShoppingList;
