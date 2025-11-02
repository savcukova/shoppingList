function ListTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center mx-1 sm:mx-3 mb-4 space-x-2">
      <button
        onClick={() => onTabChange("incomplete")}
        className={`badge flex-1 py-2 sm:py-3 text-xs sm:text-sm ${
          activeTab === "incomplete" ? "badge-primary" : "badge-ghost"
        }`}
      >
        Incomplete
      </button>
      <button
        onClick={() => onTabChange("all")}
        className={`badge flex-1 py-2 sm:py-3 text-xs sm:text-sm ${
          activeTab === "all" ? "badge-primary" : "badge-ghost"
        }`}
      >
        All
      </button>
    </div>
  );
}

export default ListTabs;
