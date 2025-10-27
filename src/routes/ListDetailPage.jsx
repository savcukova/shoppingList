import React, { useState } from "react";
import { INITIAL_SHOPPING_LIST, CURRENT_USER_ID } from "../mockData.js";

// components
import ListHeader from "../components/ListHeader.jsx";
import EditListForm from "../components/EditListForm.jsx";
import AddNewForm from "../components/AddNewForm.jsx";
import ListTabs from "../components/ListTabs.jsx";
import ItemList from "../components/ItemList.jsx";
import ConfirmationDialog from "../components/ConfirmationDialog.jsx";
import AddNewItemBtn from "../components/AddNewItemBtn.jsx";

function ListDetailPage() {
  // states
  const [list, setList] = useState(INITIAL_SHOPPING_LIST);
  const [isOwner] = useState(list.owner_id === CURRENT_USER_ID);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const [listNameValue, setListNameValue] = useState(list.name);
  const [newItemValue, setNewItemValue] = useState("");

  const [activeTab, setActiveTab] = useState("incomplete");
  const [dialog, setDialog] = useState({ open: false, actionType: null });

  // handlers
  const handleEditListName = () => {
    setListNameValue(list.name);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setList({ ...list, name: listNameValue });
    setIsEditingName(false);
  };

  if (isEditingName) {
    return (
      <EditListForm
        value={listNameValue}
        onChange={(e) => setListNameValue(e.target.value)}
        onSave={() => handleSaveName()}
        onCancel={() => setIsEditingName(false)}
        isOwner={isOwner}
        onMembers={() => console.log("Manage other members")}
      />
    );
  }

  return (
    <div>
      <div>
        <ListHeader
          name={list.name}
          isOwner={isOwner}
          onBack={() => console.log("Back to all shopping lists")}
          onEdit={handleEditListName}
          onDelete={() => console.log("Delete")}
          onArchive={() => console.log("Archive")}
        />
        <AddNewForm
          value={"value"}
          onChange={() => {
            console.log("Changed value");
          }}
          onAdd={() => console.log("Add new")}
          onCancel={() => console.log("Cancel")}
        />
        <ListTabs
          activeTab={"incomplete"}
          onTabChange={() => {
            console.log("Changed tab");
          }}
        />
        <ItemList
          items={list.items}
          onCheck={() => console.log("Check item")}
          onDeleteItem={() => console.log("Delete item")}
        />
        <AddNewItemBtn onClick={() => console.log("klik")} />
      </div>
      <ConfirmationDialog
        open={true}
        actionType="archive"
        onConfirm={() => {
          console.log("confirmed");
        }}
        onCancel={() => {
          console.log("cancelled");
        }}
      />
    </div>
  );
}

export default ListDetailPage;
