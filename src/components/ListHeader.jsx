import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faArchive,
  faChevronLeft,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function ListHeader({
  name,
  isOwner,
  onBack,
  onEdit,
  onDelete,
  onArchive,
  onLeave,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4 mt-2 gap-2">
      <div className="flex items-center flex-1 min-w-0">
        {onBack && (
          <button
            onClick={onBack}
            className="btn btn-ghost btn-square shrink-0"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        )}

        <h1 className="text-lg sm:text-xl font-bold flex-grow text-center truncate px-2">
          {name}
        </h1>
      </div>

      <div className="shrink-0">
        {isOwner && onEdit && onDelete && onArchive && (
          <div className="flex items-center space-x-1">
            <button
              onClick={onEdit}
              className="btn btn-ghost btn-square btn-sm sm:btn-md"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={onDelete}
              className="btn btn-ghost btn-square btn-sm sm:btn-md"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              onClick={onArchive}
              className="btn btn-ghost btn-square btn-sm sm:btn-md"
            >
              <FontAwesomeIcon icon={faArchive} />
            </button>
          </div>
        )}
        {!isOwner && onLeave && (
          <div className="flex items-center space-x-1">
            <button
              onClick={onLeave}
              className="btn btn-ghost btn-square btn-sm sm:btn-md"
              title="Leave list"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListHeader;
