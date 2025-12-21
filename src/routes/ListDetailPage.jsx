import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useShoppingLists } from "../contexts/ShoppingListsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

// components
import ListHeader from "../components/ListHeader.jsx";
import EditListForm from "../components/EditListForm.jsx";
import AddNewForm from "../components/AddNewForm.jsx";
import ListTabs from "../components/ListTabs.jsx";
import ItemList from "../components/ItemList.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import AddNewItemBtn from "../components/AddNewItemBtn.jsx";
import ItemsPieChart from "../components/ItemsPieChart.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import LanguageToggle from "../components/LanguageToggle.jsx";

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
    handleRemoveMember,
    loadList,
  } = useShoppingLists();

  const { currentUser } = useAuth();
  const { t } = useLanguage();

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
  const [leaveDialog, setLeaveDialog] = useState({ open: false });

  // Load list detail when listId changes
  useEffect(() => {
    if (listId) {
      loadList(listId).catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

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
        <p>{t("listNotFound")}</p>
      </div>
    );
  }

  if (!canView) {
    return (
      <div className="p-4 text-center">
        <p>{t("accessDenied")}</p>
      </div>
    );
  }

  // handlers for editing list
  const handleEditListName = () => {
    setListNameValue(list.name);
    setIsEditingName(true);
  };

  const onSave = async () => {
    try {
      await handleSaveName(listId, listNameValue);
      setIsEditingName(false);
    } catch {
      // Error already handled in context
    }
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
  const onAdd = async () => {
    if (!newItemValue.trim()) return;
    try {
      await handleAddItem(listId, newItemValue);
      setIsAddingItem(false);
      setNewItemValue("");
    } catch {
      // Error already handled in context
    }
  };

  const handleCancelAddItem = () => {
    setIsAddingItem(false);
  };

  const handleShowAddForm = () => {
    setIsAddingItem(true);
  };

  const handleConfirmDialog = async () => {
    if (dialog.actionType === "delete") {
      try {
        await handleDeleteList(listId);
        handleCloseDialog();
        navigate("/");
      } catch {
        // Error already handled in context
      }
    } else if (dialog.actionType === "archive") {
      await handleArchiveList(listId, true);
      handleCloseDialog();
    } else {
      handleCloseDialog();
    }
  };

  const handleShowLeaveDialog = () => {
    setLeaveDialog({ open: true });
  };

  const handleCloseLeaveDialog = () => {
    setLeaveDialog({ open: false });
  };

  const handleConfirmLeave = async () => {
    if (currentUser) {
      try {
        await handleRemoveMember(listId, currentUser.id);
        handleCloseLeaveDialog();
        navigate("/");
      } catch {
        // Error already handled in context
      }
    }
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
      <div className="flex items-center justify-end gap-2 mb-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>
      <div>
        <ListHeader
          name={list.name}
          isOwner={canManageList}
          onBack={() => navigate("/")}
          onEdit={canManageList ? handleEditListName : null}
          onDelete={canManageList ? () => handleShowDialog("delete") : null}
          onArchive={canManageList ? () => handleShowDialog("archive") : null}
          onLeave={
            !isOwner && userRole === "member" ? handleShowLeaveDialog : null
          }
        />

        {list.items.length > 0 && (
          <>
            <ListTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <ItemsPieChart items={list.items} />
          </>
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

      <ConfirmationDialog
        open={leaveDialog.open}
        actionType="remove"
        title={t("leaveListConfirm")}
        onConfirm={handleConfirmLeave}
        onCancel={handleCloseLeaveDialog}
      />
    </div>
  );
}

export default ListDetailPage;
