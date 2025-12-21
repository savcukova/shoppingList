import { useLanguage } from "../contexts/LanguageContext.jsx";

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "cs" ? "en" : "cs");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-ghost btn-sm sm:btn-md"
      title={t("language")}
      aria-label={t("language")}
    >
      <span className="text-sm sm:text-base">
        {language === "cs" ? "🇨🇿" : "🇬🇧"}
      </span>
      <span className="hidden sm:inline ml-2">
        {language === "cs" ? t("czech") : t("english")}
      </span>
    </button>
  );
}

export default LanguageToggle;

