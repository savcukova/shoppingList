import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Member({ member, onRemove, isOwner, currentUserId }) {
  // Owner může smazat všechny členy kromě sebe (všichni owners jsou vyloučeni)
  // Member může smazat jen sebe
  const canDelete =
    (isOwner && member.role !== "owner") || // owner smaže všechny members (ne owners, tedy ne sebe)
    (!isOwner && member.user_id === currentUserId && member.role !== "owner"); // member smaže jen sebe

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

      {canDelete && (
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
