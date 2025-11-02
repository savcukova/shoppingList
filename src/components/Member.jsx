import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Member({ member, onRemove }) {
  return (
    <li className="flex items-center justify-between bg-base-200 py-3 px-4 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <span className="text-base-content font-medium">
          {member.name}

          {member.role === "owner" && (
            <span className="badge badge-primary badge-sm ml-2">Owner</span>
          )}
        </span>
        <span className="text-sm text-gray-500">{member.email}</span>
      </div>

      {member.role !== "owner" && (
        <button
          onClick={onRemove}
          className="btn btn-ghost btn-square btn-sm text-error"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      )}
    </li>
  );
}

export default Member;
