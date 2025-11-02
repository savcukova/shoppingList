import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useShoppingLists } from "../contexts/ShoppingListsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

// components
import ListHeader from "../components/ListHeader.jsx";
import EditListForm from "../components/EditListForm.jsx";
import AddNewForm from "../components/AddNewForm.jsx";
import ListTabs from "../components/ListTabs.jsx";
import ItemList from "../components/ItemList.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import AddNewItemBtn from "../components/AddNewItemBtn.jsx";

function ListDetailPage() {
  const navigate = useNavigate();

  const {
    lists,
    handleSaveName,
    handleAddItem,
    handleToggleItem,
    handleDeleteItem,
    handleArchiveList,
    handleDeleteList,
  } = useShoppingLists();

  const { currentUser } = useAuth();

  const { listId } = useParams();
  const list = useMemo(
    () => lists.find((list) => list._id === listId),
    [lists, listId]
  );

  const userRole = useMemo(() => {
    if (!list || !currentUser) return null;
    return list.members.find((member) => member.user_id === currentUser.id)
      ?.role;
  }, [list, currentUser]);

  // Práva v aplikaci:
  // OWNER může: editovat název, smazat/archivovat list, smazat itemy, přidávat/smazat členy
  // MEMBER může: přidávat itemy, checknout itemy, smazat itemy, smazat sebe ze seznamu
  const isOwner = userRole === "owner";
  const canManageList = isOwner; // editovat název, smazat/archivovat seznam
  const canAddItem = isOwner || userRole === "member"; // přidávat itemy
  const canCheckItem = isOwner || userRole === "member"; // checknout itemy
  const canDeleteItem = isOwner || userRole === "member"; // smazat itemy - owner i member
  const canView = isOwner || userRole === "member"; // zobrazit list

  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [listNameValue, setListNameValue] = useState("");
  const [newItemValue, setNewItemValue] = useState("");

  const [activeTab, setActiveTab] = useState("incomplete");
  const [dialog, setDialog] = useState({ open: false, actionType: null });

  useEffect(() => {
    if (list) {
      setListNameValue(list.name || "");
    }
  }, [list]);

  const filteredItems = useMemo(() => {
    if (!list) return [];
    if (activeTab === "all") {
      return list.items;
    }

    return list.items.filter((item) => !item.completed);
  }, [list, activeTab]);

  if (!list) {
    return (
      <div className="p-4 text-center">
        <p>List not found</p>
      </div>
    );
  }

  if (!canView) {
    return (
      <div className="p-4 text-center">
        <p>Access Denied. You are not a member of this list.</p>
      </div>
    );
  }

  // handlers for editing list
  const handleEditListName = () => {
    setListNameValue(list.name);
    setIsEditingName(true);
  };

  const onSave = () => {
    handleSaveName(listId, listNameValue);
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
  };

  // handlers for showing dialog
  const handleShowDialog = (actionType) => {
    setDialog({ open: true, actionType: actionType });
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, actionType: null });
  };

  // handlers for adding item
  const onAdd = () => {
    if (!newItemValue.trim()) return;

    handleAddItem(listId, newItemValue, currentUser?.id);
    setIsAddingItem(false);
    setNewItemValue("");
  };

  const handleCancelAddItem = () => {
    setIsAddingItem(false);
  };

  const handleShowAddForm = () => {
    setIsAddingItem(true);
  };

  const handleConfirmDialog = () => {
    if (dialog.actionType === "delete") {
      alert(`Delete list ${list.name}`);
      handleDeleteList(listId);
    } else if (dialog.actionType === "archive") {
      alert(`Archive list ${list.name}`);
      handleArchiveList(listId, true);
    }

    handleCloseDialog();
  };

  if (isEditingName) {
    return (
      <EditListForm
        value={listNameValue}
        onChange={(e) => setListNameValue(e.target.value)}
        onSave={onSave}
        onCancel={handleCancelEdit}
        isOwner={canManageList}
        onMembers={() => navigate(`/shopping-lists/${listId}/members`)}
      />
    );
  }

  if (isAddingItem) {
    return (
      <AddNewForm
        value={newItemValue}
        onChange={(e) => setNewItemValue(e.target.value)}
        onAdd={onAdd}
        onCancel={handleCancelAddItem}
      />
    );
  }

  return (
    <div className="flex-col space-y-4 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <div>
        <ListHeader
          name={list.name}
          isOwner={canManageList}
          onBack={() => console.log("Back to all shopping lists")}
          onEdit={canManageList ? handleEditListName : null}
          onDelete={canManageList ? () => handleShowDialog("delete") : null}
          onArchive={canManageList ? () => handleShowDialog("archive") : null}
        />

        {list.items.length > 0 && (
          <ListTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        <ItemList
          items={filteredItems}
          onCheck={
            canCheckItem ? (itemId) => handleToggleItem(listId, itemId) : null
          }
          onDeleteItem={
            canDeleteItem ? (itemId) => handleDeleteItem(listId, itemId) : null
          }
        />

        {canAddItem && (
          <div className="flex justify-center mt-6">
            <AddNewItemBtn onClick={handleShowAddForm} />
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={dialog.open}
        actionType={dialog.actionType}
        onConfirm={handleConfirmDialog}
        onCancel={handleCloseDialog}
      />
    </div>
  );
}

export default ListDetailPage;
