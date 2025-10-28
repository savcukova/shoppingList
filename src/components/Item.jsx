import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSquare as farSquare,
  faSquareCheck,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

function Item({ item, onCheck, onDelete }) {
  return (
    <li>
      <span>{item.name}</span>

      <div onClick={() => onCheck(item.id)}>
        <FontAwesomeIcon icon={item.done ? faSquareCheck : farSquare} />
      </div>

      <div onClick={() => onDelete(item.id)}>
        <FontAwesomeIcon icon={faTrashCan} />
      </div>
    </li>
  );
}

export default Item;
