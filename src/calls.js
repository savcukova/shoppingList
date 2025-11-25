// Server calls - real HTTP requests to backend
// Base URL for API calls
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Helper function to make HTTP requests
const makeRequest = async (url, options = {}) => {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle error response
      const error = new Error(
        data.message || `HTTP error! status: ${response.status}`
      );
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // Re-throw if it's already our custom error
    if (error.status) {
      throw error;
    }
    // Network or other errors
    throw new Error(`Network error: ${error.message}`);
  }
};

// Auth calls
export const login = async (dtoIn) => {
  const { email, password } = dtoIn;
  const response = await makeRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Store token
  if (response.data?.token) {
    localStorage.setItem("authToken", response.data.token);
  }

  return response;
};

export const register = async (dtoIn) => {
  const { email, password, name } = dtoIn;
  const response = await makeRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });

  // Store token
  if (response.data?.token) {
    localStorage.setItem("authToken", response.data.token);
  }

  return response;
};

// Shopping List calls
export const listShoppingLists = async (dtoIn = {}) => {
  const response = await makeRequest("/shopping-lists", {
    method: "GET",
  });
  return response;
};

export const getShoppingList = async (dtoIn) => {
  const { id } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${id}`, {
    method: "GET",
  });
  return response;
};

export const createShoppingList = async (dtoIn) => {
  const { name } = dtoIn;
  const response = await makeRequest("/shopping-lists", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return response;
};

export const updateShoppingList = async (dtoIn) => {
  const { id, name } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
  return response;
};

export const deleteShoppingList = async (dtoIn) => {
  const { id } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${id}`, {
    method: "DELETE",
  });
  return response;
};

// Member calls
export const addMember = async (dtoIn) => {
  const { listId, email } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${listId}/members`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return response;
};

export const removeMember = async (dtoIn) => {
  const { listId, memberId } = dtoIn;
  const response = await makeRequest(
    `/shopping-lists/${listId}/members/${memberId}`,
    {
      method: "DELETE",
    }
  );
  return response;
};

export const removeSelfFromList = async (dtoIn) => {
  const { listId } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${listId}/members/self`, {
    method: "DELETE",
  });
  return response;
};

// Item calls
export const addItem = async (dtoIn) => {
  const { listId, name } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${listId}/items`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  return response;
};

export const markItemAsDone = async (dtoIn) => {
  const { listId, itemId, completed } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${listId}/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify({ completed }),
  });
  return response;
};

export const removeItem = async (dtoIn) => {
  const { listId, itemId } = dtoIn;
  const response = await makeRequest(`/shopping-lists/${listId}/${itemId}`, {
    method: "DELETE",
  });
  return response;
};
