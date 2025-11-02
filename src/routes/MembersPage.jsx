import { useState, useMemo } from "react";
import { useShoppingLists } from "../contexts/ShoppingListsContext";

function MembersPage() {
  const { lists, CURRENT_USER_ID, handleAddMember, handleRemoveMember } =
    useShoppingLists();

  const listId = "a44bbf9b8bc39g632f53c245";
  const list = useMemo(
    () => lists.find((list) => list._id === listId),
    [lists, listId]
  );

  const [isAdding, setIsAdding] = useState(false);
  const [email, setEmail] = useState("");
  const [dialog, setDialog] = useState({
    open: false,
    memberId: null,
    memberName: null,
  });

  if (!list) {
    return <div>List not found...</div>;
  }
}

export default MembersPage;
