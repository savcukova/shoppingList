import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ShoppingListCard({ list, isOwner, onClick, onDelete, onArchive }) {
  const completedItems = useMemo(
    () => list.items.filter((item) => item.completed).length,
    [list.items]
  );

  const total = useMemo(() => list.items.length, [list.items]);

  return (
    <div
      className="card w-full bg-base-100 border border-base-300 shadow-sm hover:shadow-md cursor-pointer transition-shadow"
      onClick={onClick}
    >
      <div className="card-body p-4 sm:p-5">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-base sm:text-lg">{list.name}</h2>
          {isOwner && (
            <div className="card-actions gap-1">
              <button
                className="btn btn-ghost btn-square btn-sm text-warning"
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive();
                }}
              >
                <FontAwesomeIcon icon={faArchive} />
              </button>
              <button
                className="btn btn-ghost btn-square btn-sm text-error"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListCard;
