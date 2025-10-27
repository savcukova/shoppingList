function ListTabs({ activeTab, onTabChange }) {
  return (
    <div>
      <button onClick={() => onTabChange("incomplete")}>Incomplete</button>
      <button onClick={() => onTabChange("all")}>All</button>
    </div>
  );
}

export default ListTabs;
