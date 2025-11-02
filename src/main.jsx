import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ShoppingListsProvider } from "./contexts/ShoppingListsContext.jsx";

import "./main.css";
import App from "./App.jsx";

import ListDetailPage from "./routes/ListDetailPage.jsx";
import MembersPage from "./routes/MembersPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShoppingListsProvider>
      <RouterProvider router={router} />
    </ShoppingListsProvider>
  </StrictMode>
);
