import { useLanguage } from "../contexts/LanguageContext.jsx";

function ListTabs({ activeTab, onTabChange }) {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center mx-1 sm:mx-3 mb-4 space-x-2">
      <button
        onClick={() => onTabChange("incomplete")}
        className={`badge flex-1 py-2 sm:py-3 text-xs sm:text-sm ${
          activeTab === "incomplete" ? "badge-primary" : "badge-ghost"
        }`}
      >
        {t("incomplete")}
      </button>
      <button
        onClick={() => onTabChange("all")}
        className={`badge flex-1 py-2 sm:py-3 text-xs sm:text-sm ${
          activeTab === "all" ? "badge-primary" : "badge-ghost"
        }`}
      >
        {t("allItems")}
      </button>
    </div>
  );
}

export default ListTabs;
