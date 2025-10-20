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

      {/* changing state (done or no)*/}
      <div onClick={() => onCheck(item.id)}>
        <FontAwesomeIcon icon={item.done ? faCheckSquare : faSquare} />
      </div>
      {/* deleting item*/}
      <div onClick={() => onDelete(item.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </li>
  );
}

export default Item;
