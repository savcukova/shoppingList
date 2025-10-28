import React, { useState, useMemo } from "react";
import { INITIAL_SHOPPING_LIST, CURRENT_USER_ID } from "../mockData.js";

// components
import ListHeader from "../components/ListHeader.jsx";
import EditListForm from "../components/EditListForm.jsx";
import AddNewForm from "../components/AddNewForm.jsx";
import ListTabs from "../components/ListTabs.jsx";
import ItemList from "../components/ItemList.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import AddNewItemBtn from "../components/AddNewItemBtn.jsx";

function ListDetailPage() {
  // states
  const [list, setList] = useState(INITIAL_SHOPPING_LIST);
  const [isOwner] = useState(list.owner_id === CURRENT_USER_ID);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [listNameValue, setListNameValue] = useState(list.name);
  const [newItemValue, setNewItemValue] = useState("");

  const [activeTab, setActiveTab] = useState("incomplete");
  const [dialog, setDialog] = useState({ open: false, actionType: null });

  // handlers for editing list
  const handleEditListName = () => {
    setListNameValue(list.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setList({ ...list, name: listNameValue });
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
  const handleAddItem = () => {
    if (!newItemValue.trim()) return;

    const newItem = {
      id: `item-${Date.now()}`,
      name: newItemValue,
      completed: false,
    };

    setList((prevList) => ({
      ...prevList,
      items: [...prevList.items, newItem],
    }));

    setIsAddingItem(false);
    setNewItemValue("");
  };

  const handleCancelAddItem = () => {
    setIsAddingItem(false);
  };

  const handleShowAddForm = () => {
    setIsAddingItem(true);
  };

  // handlers for check/delete
  const handleToggleItem = (itemId) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    }));
  };

  const handleDeleteItem = (itemId) => {
    setList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== itemId),
    }));
  };

  const handleConfirmDialog = () => {
    if (dialog.actionType === "delete") {
      alert(`Delete list ${list.name}`);
    } else if (dialog.actionType === "archive") {
      alert(`Archive list ${list.name}`);
      setList((prevList) => ({ ...prevList, is_archived: true }));
    }

    handleCloseDialog();
  };

  const filteredItems = useMemo(() => {
    if (activeTab === "all") {
      return list.items;
    }

    return list.items.filter((item) => !item.completed);
  }, [list.items, activeTab]);

  if (isEditingName) {
    return (
      <EditListForm
        value={listNameValue}
        onChange={(e) => setListNameValue(e.target.value)}
        onSave={() => handleSaveName()}
        onCancel={() => handleCancelEdit()}
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
        onAdd={handleAddItem}
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
          onCheck={handleToggleItem}
          onDeleteItem={handleDeleteItem}
        />

        <div className="flex justify-center mt-6">
          <AddNewItemBtn onClick={handleShowAddForm} />
        </div>
      </div>

      <ConfirmationDialog
        open={dialog.open}
        actionType={dialog.actionType}
        onConfirm={() => {
          handleConfirmDialog();
        }}
        onCancel={() => handleCloseDialog()}
      />
    </div>
  );
}

export default ListDetailPage;
