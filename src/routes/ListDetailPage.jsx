import React, { useState } from "react";
import { INITIAL_SHOPPING_LIST } from "../mockData.js";

// components
import ListHeader from "../components/ListHeader.jsx";
import EditListForm from "../components/EditListForm.jsx";
import AddNewForm from "../components/AddNewForm.jsx";
import ListTabs from "../components/ListTabs.jsx";
import ItemList from "../components/ItemList.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";

function ListDetailPage() {
  const [list, setList] = useState(INITIAL_SHOPPING_LIST);
  const [isOwner] = useState(list.owner_id === CURRENT_USER_ID);

  return (
    <div>
      <div>
        <ListHeader />
        <AddNewForm />
        <ListTabs />
        <ItemList />
      </div>
      <ConfirmationDialog />
    </div>
  );
}

export default ListDetailPage;
