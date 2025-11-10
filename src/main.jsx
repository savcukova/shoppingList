import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ShoppingListsProvider } from "./contexts/ShoppingListsContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

import "./main.css";
import App from "./App.jsx";

import ListDetailPage from "./routes/ListDetailPage.jsx";
import MembersPage from "./routes/MembersPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import Dashboard from "./routes/Dashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/shopping-lists/:listId",
            element: <ListDetailPage />,
          },
          {
            path: "/shopping-lists/:listId/members",
            element: <MembersPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShoppingListsProvider>
        <RouterProvider router={router} />
      </ShoppingListsProvider>
    </AuthProvider>
  </StrictMode>
);
