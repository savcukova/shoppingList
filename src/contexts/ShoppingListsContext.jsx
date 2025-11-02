import React, { createContext, useContext, useState } from "react";
import { INITIAL_SHOPPING_LISTS } from "../data/mockData.js";

const ShoppingListsContext = createContext();

export function ShoppingListsProvider({ children }) {
  const [lists, setLists] = useState(INITIAL_SHOPPING_LISTS);

  const handleCreateList = (listName, ownerUser) => {
    const newList = {
      _id: `list-${Date.now()}`,
      name: listName,
      owner_id: ownerUser.user_id,
      is_archived: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      members: [
        {
          user_id: ownerUser.user_id,
          name: "Current User",
          role: "owner",
        },
      ],
      items: [],
    };
    setLists((prevLists) => [...prevLists, newList]);
  };

  const handleArchiveList = (listId, is_archived) => {
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

  const handleDeleteList = (listId) => {
    setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
  };

  const handleAddItem = (listId, newItemName, userId) => {
    const newItem = {
      _id: `item-${Date.now()}`,
      name: newItemName,
      completed: false,
      added_by: userId,
      created_at: new Date().toISOString(),
    };

    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              items: [...list.items, newItem],
              updated_at: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const handleToggleItem = (listId, itemId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              updated_at: new Date().toISOString(),
              items: list.items.map((item) =>
                item._id === itemId
                  ? {
                      ...item,
                      completed: !item.completed,
                      completed_at: !item.completed
                        ? new Date().toISOString()
                        : null,
                    }
                  : item
              ),
            }
          : list
      )
    );
  };

  const handleDeleteItem = (listId, itemId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item._id !== itemId),
              updated_at: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const handleSaveName = (listId, newName) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              name: newName,
              updated_at: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const handleAddMember = (listId, email) => {
    const newMember = {
      user_id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email: email,
      role: "member",
      joined_at: new Date().toISOString(),
    };

    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              members: [...list.members, newMember],
              updated_at: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const handleRemoveMember = (listId, userId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list._id === listId
          ? {
              ...list,
              members: list.members.filter(
                (member) => member.user_id !== userId
              ),
              updated_at: new Date().toISOString(),
            }
          : list
      )
    );
  };

  const value = {
    lists,
    handleCreateList,
    handleArchiveList,
    handleDeleteList,
    handleAddItem,
    handleToggleItem,
    handleDeleteItem,
    handleSaveName,
    handleAddMember,
    handleRemoveMember,
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
