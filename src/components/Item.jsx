import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSquare as farSquare,
  faSquareCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

function Item({ item, onCheck, onDelete }) {
  const checkIcon = item.completed ? faSquareCheck : farSquare;

  return (
    <li className="flex items-center justify-between bg-base-200 px-3 sm:px-4 py-4 sm:py-5 mx-1 sm:mx-3 rounded-lg mb-2">
      <span
        className={`text-sm sm:text-base truncate pr-2 ${
          item.completed ? "line-through text-gray-400" : "text-base-content"
        }`}
      >
        {item.name}
      </span>

      <div className="flex items-center shrink-0 gap-2 sm:gap-3">
        <FontAwesomeIcon
          icon={checkIcon}
          onClick={() => onCheck(item._id)}
          className={`cursor-pointer text-base sm:text-lg ${
            item.completed ? "text-success" : "text-gray-400"
          }`}
        />

        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => onDelete(item._id)}
          className="cursor-pointer text-base sm:text-lg text-error hover:text-error-focus"
        />
      </div>
    </li>
  );
}

export default Item;
