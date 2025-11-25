import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import * as api from "../api.js";

const ShoppingListsContext = createContext();

export function ShoppingListsProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, currentUser, isLoading: authLoading } = useAuth();

  // Load lists when authenticated (wait for auth to finish loading)
  useEffect(() => {
    // Don't do anything while auth is still loading
    if (authLoading) {
      return;
    }
    
    // Only load lists if user is authenticated
    if (isAuthenticated && currentUser) {
      loadLists();
    } else {
      // Clear lists if user is not authenticated
      setLists([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, authLoading, currentUser]);

  const loadLists = async () => {
    setIsLoading(true);
    try {
      const response = await api.listShoppingLists();
      if (response.status === "success" && response.data?.lists) {
        setLists(response.data.lists);
      }
    } catch (err) {
      console.error("Error loading lists:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadList = async (listId) => {
    try {
      const response = await api.getShoppingList({ id: listId });
      if (response.status === "success" && response.data?.list) {
        setLists((prevLists) => {
          const existingIndex = prevLists.findIndex((l) => l._id === listId);
          if (existingIndex >= 0) {
            return prevLists.map((l, i) =>
              i === existingIndex ? response.data.list : l
            );
          }
          return [...prevLists, response.data.list];
        });
        return response.data.list;
      }
      return null;
    } catch (err) {
      console.error("Error loading list:", err);
      throw err;
    }
  };

  const handleCreateList = async (listName) => {
    try {
      const response = await api.createShoppingList({ name: listName });
      if (response.status === "success" && response.data?.list) {
        setLists((prevLists) => [...prevLists, response.data.list]);
        return response.data.list;
      }
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to create list";
      alert(errorMessage);
      throw err;
    }
  };

  const handleArchiveList = async (listId, is_archived) => {
    // Note: Server doesn't have archive endpoint, so we update locally
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              is_archived: is_archived,
              updated_at: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const handleDeleteList = async (listId) => {
    try {
      await api.deleteShoppingList({ id: listId });
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to delete list";
      alert(errorMessage);
      throw err;
    }
  };

  const handleAddItem = async (listId, newItemName) => {
    try {
      const response = await api.addItem({ listId, name: newItemName });
      if (response.status === "success") {
        await loadList(listId);
      }
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to add item";
      alert(errorMessage);
      throw err;
    }
  };

  const handleToggleItem = async (listId, itemId) => {
    try {
      const list = lists.find((l) => l._id === listId);
      const item = list?.items.find((i) => i._id === itemId);
      const newCompleted = !item?.completed;

      await api.markItemAsDone({
        listId,
        itemId,
        completed: newCompleted,
      });

      await loadList(listId);
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to update item";
      alert(errorMessage);
      throw err;
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    try {
      await api.removeItem({ listId, itemId });
      await loadList(listId);
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to delete item";
      alert(errorMessage);
      throw err;
    }
  };

  const handleSaveName = async (listId, newName) => {
    try {
      const response = await api.updateShoppingList({
        id: listId,
        name: newName,
      });
      if (response.status === "success" && response.data?.list) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list._id === listId ? response.data.list : list
          )
        );
      }
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to update list name";
      alert(errorMessage);
      throw err;
    }
  };

  const handleAddMember = async (listId, email) => {
    try {
      await api.addMember({ listId, email });
      await loadList(listId);
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to add member";
      alert(errorMessage);
      throw err;
    }
  };

  const handleRemoveMember = async (listId, userId) => {
    try {
      if (currentUser?.id === userId) {
        await api.removeSelfFromList({ listId });
      } else {
        await api.removeMember({ listId, memberId: userId });
      }
      await loadList(listId);
    } catch (err) {
      const errorMessage =
        err.data?.message || err.message || "Failed to remove member";
      alert(errorMessage);
      throw err;
    }
  };

  const value = {
    lists,
    isLoading,
    handleCreateList,
    handleArchiveList,
    handleDeleteList,
    handleAddItem,
    handleToggleItem,
    handleDeleteItem,
    handleSaveName,
    handleAddMember,
    handleRemoveMember,
    loadList,
    loadLists,
  };

  return (
    <ShoppingListsContext.Provider value={value}>
      {children}
    </ShoppingListsContext.Provider>
  );
}

export const useShoppingLists = () => {
  const context = useContext(ShoppingListsContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingLists must be used within a ShoppingListsProvider"
    );
  }
  return context;
};
