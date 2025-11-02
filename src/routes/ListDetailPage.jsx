import React, { useState, useMemo, useEffect } from "react";

import { useShoppingLists } from "../contexts/ShoppingListsContext.jsx";

// components
import ListHeader from "../components/ListHeader.jsx";
import EditListForm from "../components/EditListForm.jsx";
import AddNewForm from "../components/AddNewForm.jsx";
import ListTabs from "../components/ListTabs.jsx";
import ItemList from "../components/ItemList.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import AddNewItemBtn from "../components/AddNewItemBtn.jsx";

function ListDetailPage() {
  const {
    lists,
    CURRENT_USER_ID,
    handleSaveName,
    handleAddItem,
    handleToggleItem,
    handleDeleteItem,
    handleArchiveList,
    handleDeleteList,
  } = useShoppingLists();

  const listId = "a44bbf9b8bc39g632f53c245";
  const list = useMemo(
    () => lists.find((list) => list._id === listId),
    [lists, listId]
  );

  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [listNameValue, setListNameValue] = useState("");
  const [newItemValue, setNewItemValue] = useState("");

  const isOwner = useMemo(
    () => (list ? list.owner_id === CURRENT_USER_ID : false),
    [list, CURRENT_USER_ID]
  );

  useEffect(() => {
    if (list) {
      setListNameValue(list.name || "");
    }
  }, [list]);

  const [activeTab, setActiveTab] = useState("incomplete");
  const [dialog, setDialog] = useState({ open: false, actionType: null });

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

    handleAddItem(listId, newItemValue);
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
        isOwner={isOwner}
        onMembers={() => console.log("Manage other members")}
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
    <div className="flex-col space-y-4 px-6">
      <div>
        <ListHeader
          name={list.name}
          isOwner={isOwner}
          onBack={() => console.log("Back to all shopping lists")}
          onEdit={handleEditListName}
          onDelete={() => handleShowDialog("delete")}
          onArchive={() => handleShowDialog("archive")}
        />

        {list.items.length > 0 && (
          <ListTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        <ItemList
          items={filteredItems}
          onCheck={(itemId) => handleToggleItem(listId, itemId)}
          onDeleteItem={(itemId) => handleDeleteItem(listId, itemId)}
        />

        <div className="flex justify-center mt-6">
          <AddNewItemBtn onClick={handleShowAddForm} />
        </div>
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
