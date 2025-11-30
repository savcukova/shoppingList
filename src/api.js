const useMockData = import.meta.env.VITE_USE_MOCK_DATA === "true";

if (useMockData) {
  console.log("Using MOCK data for server calls");
} else {
  console.log("Using REAL server calls");
}

import * as realCalls from "./calls.js";
import * as mockCalls from "./mock/calls.js";

const calls = useMockData ? mockCalls : realCalls;

export const login = calls.login;
export const register = calls.register;
export const listShoppingLists = calls.listShoppingLists;
export const getShoppingList = calls.getShoppingList;
export const createShoppingList = calls.createShoppingList;
export const updateShoppingList = calls.updateShoppingList;
export const deleteShoppingList = calls.deleteShoppingList;
export const addMember = calls.addMember;
export const removeMember = calls.removeMember;
export const removeSelfFromList = calls.removeSelfFromList;
export const addItem = calls.addItem;
export const markItemAsDone = calls.markItemAsDone;
export const removeItem = calls.removeItem;
