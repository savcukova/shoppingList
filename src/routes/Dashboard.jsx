import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { useShoppingLists } from "../contexts/ShoppingListsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

import DashboardTabs from "../components/DashboardTabs.jsx";
import ShoppingList from "../components/ShoppingList.jsx";
import AddListForm from "../components/AddListForm.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import AddNewItemBtn from "../components/AddNewItemBtn.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const { lists, handleCreateList, handleDeleteList, handleArchiveList } =
    useShoppingLists();

  const { currentUser, logout } = useAuth();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [listNameValue, setListNameValue] = useState("");
  const [activeTab, setActiveTab] = useState("my");
  const [dialog, setDialog] = useState({ open: false, listId: null });

  const allUserLists = useMemo(() => {
    if (!currentUser) return [];
    return lists.filter((list) =>
      list.members.some((m) => m.user_id === currentUser.id)
    );
  }, [lists, currentUser]);

  const visibleLists = useMemo(() => {
    if (!currentUser) return [];
    const isArchivedTab = activeTab === "archived";

    return allUserLists.filter((list) => {
      const matchesArchive = list.is_archived === isArchivedTab;
      return matchesArchive;
    });
  }, [allUserLists, activeTab, currentUser]);

  const handleSelectList = (listId) => {
    navigate(`/shopping-lists/${listId}`);
  };
  const handleShowDeleteDialog = (listId) => {
    setDialog({ open: true, listId: listId });
  };
  const handleConfirmDelete = () => {
    handleDeleteList(dialog.listId);
    setDialog({ open: false, listId: null });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleCloseDialog = () => {
    setDialog({ open: false, listId: null });
  };
  const handleArchive = (listId, isArchived) => {
    handleArchiveList(listId, !isArchived);
  };
  const onAddList = () => {
    if (!currentUser || !listNameValue.trim()) return;
    // handleCreateList očekává objekt s user_id, ale currentUser má id
    const ownerUser = {
      user_id: currentUser.id,
      name: currentUser.name,
    };
    handleCreateList(listNameValue.trim(), ownerUser);
    setListNameValue("");
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    if (!isAddModalOpen) {
      setListNameValue("");
    }
  }, [isAddModalOpen]);

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <p className="text-gray-500 text-base sm:text-lg">No lists</p>
    </div>
  );

  return (
    <div className="flex-col space-y-4 px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl sm:text-2xl font-bold">
          {allUserLists.length === 0
            ? "Shopping list"
            : visibleLists.length === 0 && activeTab === "my"
            ? "Shopping list"
            : "Lists"}
        </h1>
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm sm:btn-md"
          title="Logout"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="hidden sm:inline ml-2">Logout</span>
        </button>
      </div>

      {allUserLists.length > 0 && (
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      <div className="py-4">
        {visibleLists.length === 0 ? (
          <EmptyState />
        ) : (
          <ShoppingList
            lists={visibleLists}
            currentUser={currentUser}
            onSelectList={handleSelectList}
            onDeleteList={handleShowDeleteDialog}
            onArchiveList={handleArchive}
          />
        )}
      </div>

      {activeTab === "my" && (
        <div className="flex justify-center mt-6">
          <AddNewItemBtn onClick={() => setIsAddModalOpen(true)} />
        </div>
      )}

      <ConfirmationDialog
        open={dialog.open}
        actionType="delete"
        title="Delete this list?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
      />

      {isAddModalOpen && (
        <AddListForm
          value={listNameValue}
          onChange={(e) => setListNameValue(e.target.value)}
          onAdd={onAddList}
          onCancel={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
