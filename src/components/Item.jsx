import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSquare as farSquare,
  faSquareCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

function Item({ item, onCheck, onDelete }) {
  const checkIcon = item.completed ? faSquareCheck : farSquare;

  return (
    <li className="flex items-center justify-between bg-base-200 px-4 py-5 mx-3 rounded-lg mb-2">
      <span
        className={`${
          item.completed ? "line-through text-gray-400" : "text-base-content"
        }`}
      >
        {item.name}
      </span>

      <div className="flex items-center">
        <FontAwesomeIcon
          icon={checkIcon}
          onClick={() => onCheck(item.id)}
          className={`cursor-pointer text-lg mr-3 ${
            item.completed ? "text-success" : "text-gray-400"
          }`}
        />

        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={() => onDelete(item.id)}
          className="cursor-pointer text-lg text-error hover:text-error-focus"
        />
      </div>
    </li>
  );
}

export default Item;
