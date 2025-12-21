import { useLanguage } from "../contexts/LanguageContext.jsx";

function DashboardTabs({ activeTab, onTabChange }) {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-center mx-1 sm:mx-3 mb-4 space-x-2">
      <button
        onClick={() => onTabChange("my")}
        className={`badge flex-1 py-2 sm:py-3 text-xs sm:text-sm ${
          activeTab === "my" ? "badge-primary" : "badge-ghost"
        }`}
      >
        {t("myLists")}
      </button>
      <button
        onClick={() => onTabChange("archived")}
        className={`badge flex-1 py-2 sm:py-3 text-xs sm:text-sm ${
          activeTab === "archived" ? "badge-primary" : "badge-ghost"
        }`}
      >
        {t("archived")}
      </button>
    </div>
  );
}

export default DashboardTabs;

