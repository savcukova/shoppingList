import { useState, useMemo } from "react";
import { useShoppingLists } from "../contexts/ShoppingListsContext.jsx";

import { useNavigate } from "react-router-dom";

import ListHeader from "../components/ListHeader.jsx";
import MemberList from "../components/MemberList.jsx";
import AddNewMemberBtn from "../components/AddNewMemberBtn.jsx";
import AddNewMemberForm from "../components/AddNewMemberForm.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";

function MembersPage() {
  const navigate = useNavigate();
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

  const onAddMember = () => {
    if (!email.trim()) {
      alert("Please enter email");
      return;
    }
    handleAddMember(listId, email);
    setEmail("");
    setIsAdding(false);
  };

  const onShowRemoveDialog = (memberId) => {
    const member = list.members.find((member) => member.user_id === memberId);
    setDialog({
      open: true,
      memberId: memberId,
      memberName: member ? member.name : "this user",
    });
  };

  const onConfirmRemove = () => {
    handleRemoveMember(listId, dialog.memberId);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, memberId: null, memberName: null });
  };

  if (!list) {
    return (
      <div className="p-4 sm:p-6 md:p-8 text-center">
        <p>List not found</p>
      </div>
    );
  }

  if (isAdding) {
    return (
      <AddNewMemberForm
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onAdd={onAddMember}
        onCancel={() => setIsAdding(false)}
      />
    );
  }

  return (
    <div className="flex-col space-y-4 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <div>
        <ListHeader
          name="List users"
          onBack={() => navigate(-1)}
          isOwner={false}
        />

        <MemberList
          members={list.members}
          onRemoveMember={onShowRemoveDialog}
        />

        <div className="flex justify-center mt-6">
          <AddNewMemberBtn onClick={() => setIsAdding(true)} />
        </div>
      </div>

      <ConfirmationDialog
        open={dialog.open}
        actionType="delete"
        title={`Delete ${dialog.memberName || "member"}?`}
        onConfirm={onConfirmRemove}
        onCancel={handleCloseDialog}
      />
    </div>
  );
}

export default MembersPage;
