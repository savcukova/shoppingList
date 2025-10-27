import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Item({ item, onCheck, onDelete }) {
  return (
    <li>
      <span>{item.name}</span>

      <div onClick={() => onCheck(item.id)}>
        <FontAwesomeIcon icon={item.done ? faCheckSquare : faSquare} />
      </div>

      <div onClick={() => onDelete(item.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </li>
  );
}

export default Item;
