function ListTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mx-3 mb-4 space-x-2">
      <button
        onClick={() => onTabChange("incomplete")}
        className={`badge flex-1 py-3 ${
          activeTab === "incomplete" ? "badge-primary" : "badge-ghost"
        }`}
      >
        Incomplete
      </button>
      <button
        onClick={() => onTabChange("all")}
        className={`badge flex-1 py-3 ${
          activeTab === "all" ? "badge-primary" : "badge-ghost"
        }`}
      >
        All
      </button>
    </div>
  );
}

export default ListTabs;
