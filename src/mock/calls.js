// Mock implementation of server calls - uses local mock data
import { MOCK_USERS, INITIAL_SHOPPING_LISTS } from "../data/mockData.js";

// Simulate network delay
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to find user by email
const findUserByEmail = (email) => {
  return MOCK_USERS.find((user) => user.email === email);
};

// Helper to generate mock token
const generateMockToken = (user) => {
  return `mock_token_${user.user_id}_${Date.now()}`;
};

// Helper to get current user from token
const getCurrentUserFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token || !token.startsWith("mock_token_")) return null;

  const parts = token.split("_");
  if (parts.length < 3) return null;

  const userId = parts[2];
  const user = MOCK_USERS.find((u) => u.user_id === userId);
  if (!user) return null;

  return {
    id: user.user_id,
    email: user.email,
    name: user.name,
  };
};

// Mock data storage (simulates server state)
let mockLists = JSON.parse(JSON.stringify(INITIAL_SHOPPING_LISTS));
let mockUsers = JSON.parse(JSON.stringify(MOCK_USERS));

// Auth calls
export const login = async (dtoIn) => {
  await delay();
  const { email, password } = dtoIn;

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    error.data = { message: "Invalid email or password" };
    throw error;
  }

  const token = generateMockToken(user);
  localStorage.setItem("authToken", token);

  return {
    status: "success",
    data: {
      token,
      user: {
        id: user.user_id,
        email: user.email,
        name: user.name,
      },
    },
    uuAppErrorMap: {},
  };
};

export const register = async (dtoIn) => {
  await delay();
  const { email, password, name } = dtoIn;

  if (findUserByEmail(email)) {
    const error = new Error("User with this email already exists");
    error.status = 409;
    error.data = { message: "User with this email already exists" };
    throw error;
  }

  const newUser = {
    user_id: `user-${Date.now()}`,
    email: email.toLowerCase().trim(),
    password: password,
    name: name.trim(),
  };

  mockUsers.push(newUser);

  const token = generateMockToken(newUser);
  localStorage.setItem("authToken", token);

  return {
    status: "success",
    data: {
      token,
      user: {
        id: newUser.user_id,
        email: newUser.email,
        name: newUser.name,
      },
    },
    uuAppErrorMap: {},
  };
};

// Shopping List calls
export const listShoppingLists = async () => {
  await delay();
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const userLists = mockLists.filter((list) =>
    list.members.some((member) => member.user_id === currentUser.id)
  );

  return {
    status: "success",
    data: {
      lists: userLists,
    },
    uuAppErrorMap: {},
  };
};

export const getShoppingList = async (dtoIn) => {
  await delay();
  const { id } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === id);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  const isMember = list.members.some((m) => m.user_id === currentUser.id);
  if (!isMember) {
    const error = new Error("Access denied");
    error.status = 403;
    error.data = { message: "Access denied" };
    throw error;
  }

  return {
    status: "success",
    data: {
      list: list,
    },
    uuAppErrorMap: {},
  };
};

export const createShoppingList = async (dtoIn) => {
  await delay();
  const { name } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const newList = {
    _id: `list-${Date.now()}`,
    name: name.trim(),
    owner_id: currentUser.id,
    is_archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    members: [
      {
        user_id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: "owner",
        joined_at: new Date().toISOString(),
      },
    ],
    items: [],
  };

  mockLists.push(newList);

  return {
    status: "success",
    data: {
      list: newList,
    },
    uuAppErrorMap: {},
  };
};

export const updateShoppingList = async (dtoIn) => {
  await delay();
  const { id, name } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === id);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  if (list.owner_id !== currentUser.id) {
    const error = new Error("Only owner can update list");
    error.status = 403;
    error.data = { message: "Only owner can update list" };
    throw error;
  }

  list.name = name.trim();
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: {
      list: list,
    },
    uuAppErrorMap: {},
  };
};

export const deleteShoppingList = async (dtoIn) => {
  await delay();
  const { id } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const listIndex = mockLists.findIndex((l) => l._id === id);

  if (listIndex === -1) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  const list = mockLists[listIndex];

  if (list.owner_id !== currentUser.id) {
    const error = new Error("Only owner can delete list");
    error.status = 403;
    error.data = { message: "Only owner can delete list" };
    throw error;
  }

  mockLists.splice(listIndex, 1);

  return {
    status: "success",
    uuAppErrorMap: {},
  };
};

// Member calls
export const addMember = async (dtoIn) => {
  await delay();
  const { listId, email } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === listId);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  if (list.owner_id !== currentUser.id) {
    const error = new Error("Only owner can add members");
    error.status = 403;
    error.data = { message: "Only owner can add members" };
    throw error;
  }

  const existingMember = list.members.find(
    (m) => m.email.toLowerCase() === email.toLowerCase()
  );

  if (existingMember) {
    const error = new Error(
      `Member with email '${email}' is already in this list`
    );
    error.status = 409;
    error.data = {
      message: `Member with email '${email}' is already in this list`,
    };
    throw error;
  }

  let user = findUserByEmail(email);
  if (!user) {
    user = {
      user_id: `user-${Date.now()}`,
      email: email.toLowerCase().trim(),
      name: email.split("@")[0],
    };
    mockUsers.push(user);
  }

  const newMember = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: "member",
    joined_at: new Date().toISOString(),
  };

  list.members.push(newMember);
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: {
      member: newMember,
    },
    uuAppErrorMap: {},
  };
};

export const removeMember = async (dtoIn) => {
  await delay();
  const { listId, memberId } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === listId);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  const isOwner = list.owner_id === currentUser.id;
  const isRemovingSelf = memberId === currentUser.id;

  if (!isOwner && !isRemovingSelf) {
    const error = new Error("Access denied");
    error.status = 403;
    error.data = { message: "Access denied" };
    throw error;
  }

  if (memberId === list.owner_id) {
    const error = new Error("Cannot remove owner");
    error.status = 400;
    error.data = { message: "Cannot remove owner" };
    throw error;
  }

  const memberIndex = list.members.findIndex((m) => m.user_id === memberId);

  if (memberIndex === -1) {
    const error = new Error("Member not found");
    error.status = 404;
    error.data = { message: "Member not found" };
    throw error;
  }

  list.members.splice(memberIndex, 1);
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: {
      list: list,
    },
    uuAppErrorMap: {},
  };
};

export const removeSelfFromList = async (dtoIn) => {
  await delay();
  const { listId } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === listId);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  if (list.owner_id === currentUser.id) {
    const error = new Error("Owner cannot remove themselves");
    error.status = 400;
    error.data = { message: "Owner cannot remove themselves" };
    throw error;
  }

  const memberIndex = list.members.findIndex(
    (m) => m.user_id === currentUser.id
  );

  if (memberIndex === -1) {
    const error = new Error("Member not found");
    error.status = 404;
    error.data = { message: "Member not found" };
    throw error;
  }

  list.members.splice(memberIndex, 1);
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: null,
    uuAppErrorMap: {},
  };
};

// Item calls
export const addItem = async (dtoIn) => {
  await delay();
  const { listId, name } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === listId);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  const isMember = list.members.some((m) => m.user_id === currentUser.id);
  if (!isMember) {
    const error = new Error("Access denied");
    error.status = 403;
    error.data = { message: "Access denied" };
    throw error;
  }

  const newItem = {
    _id: `item-${Date.now()}`,
    name: name.trim(),
    completed: false,
    completed_at: null,
    added_by: currentUser.id,
    created_at: new Date().toISOString(),
  };

  list.items.push(newItem);
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: {
      item: newItem,
    },
    uuAppErrorMap: {},
  };
};

export const markItemAsDone = async (dtoIn) => {
  await delay();
  const { listId, itemId, completed } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === listId);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  const isMember = list.members.some((m) => m.user_id === currentUser.id);
  if (!isMember) {
    const error = new Error("Access denied");
    error.status = 403;
    error.data = { message: "Access denied" };
    throw error;
  }

  const item = list.items.find((i) => i._id === itemId);

  if (!item) {
    const error = new Error("Item not found");
    error.status = 404;
    error.data = { message: "Item not found" };
    throw error;
  }

  item.completed = completed === true;
  item.completed_at = completed === true ? new Date().toISOString() : null;
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: {
      item: item,
    },
    uuAppErrorMap: {},
  };
};

export const removeItem = async (dtoIn) => {
  await delay();
  const { listId, itemId } = dtoIn;
  const currentUser = getCurrentUserFromToken();

  if (!currentUser) {
    const error = new Error("Unauthorized");
    error.status = 401;
    error.data = { message: "Unauthorized" };
    throw error;
  }

  const list = mockLists.find((l) => l._id === listId);

  if (!list) {
    const error = new Error("Shopping list not found");
    error.status = 404;
    error.data = { message: "Shopping list not found" };
    throw error;
  }

  const isMember = list.members.some((m) => m.user_id === currentUser.id);
  if (!isMember) {
    const error = new Error("Access denied");
    error.status = 403;
    error.data = { message: "Access denied" };
    throw error;
  }

  const itemIndex = list.items.findIndex((i) => i._id === itemId);

  if (itemIndex === -1) {
    const error = new Error("Item not found");
    error.status = 404;
    error.data = { message: "Item not found" };
    throw error;
  }

  list.items.splice(itemIndex, 1);
  list.updated_at = new Date().toISOString();

  return {
    status: "success",
    data: {
      list: list,
    },
    uuAppErrorMap: {},
  };
};
