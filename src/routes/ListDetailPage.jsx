import React, { useState } from "react";
import { INITIAL_SHOPPING_LIST, CURRENT_USER_ID } from "../mockData.js";

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
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <div>
      <div>
        <ListHeader name={list.name} isOwner={isOwner} />
        <AddNewForm />
        <ListTabs />
        <ItemList />
      </div>
      <ConfirmationDialog />
    </div>
  );
}

export default ListDetailPage;
