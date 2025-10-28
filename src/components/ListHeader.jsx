import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faArchive,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function ListHeader({ name, isOwner, onBack, onEdit, onDelete, onArchive }) {
  return (
    <div className="flex flex-wrap items-center justify-between mb-4 mt-2">
      <div className="flex items-center">
        <button onClick={onBack} className="btn btn-ghost btn-square">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>

        <h1 className="text-xl font-bold flex-grow text-center">{name}</h1>
      </div>

      <div>
        {isOwner && (
          <div className="flex items-center space-x-1">
            <button
              onClick={onEdit}
              className="btn btn-ghost btn-square btn-md"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              onClick={onDelete}
              className="btn btn-ghost btn-square btn-md"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
            <button
              onClick={onArchive}
              className="btn btn-ghost btn-square btn-md"
            >
              <FontAwesomeIcon icon={faArchive} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListHeader;
