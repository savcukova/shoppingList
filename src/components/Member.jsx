import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Member({ member, onRemove }) {
  return (
    <li className="flex items-center justify-between bg-base-200 px-3 sm:px-4 py-4 sm:py-5 mx-1 sm:mx-3 rounded-lg mb-2">
      <div className="flex flex-col min-w-0 flex-1 pr-2">
        <span className="text-sm sm:text-base text-base-content font-medium truncate">
          {member.name}

          {member.role === "owner" && (
            <span className="badge badge-primary badge-xs sm:badge-sm ml-2">
              Owner
            </span>
          )}
        </span>
        <span className="text-xs sm:text-sm text-gray-500 truncate">
          {member.email}
        </span>
      </div>

      {member.role !== "owner" && (
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={onRemove}
          className="cursor-pointer text-base sm:text-lg text-error hover:text-error-focus shrink-0"
        />
      )}
    </li>
  );
}

export default Member;
