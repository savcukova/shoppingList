import { useTheme } from "../contexts/ThemeContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../contexts/LanguageContext.jsx";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm sm:btn-md"
      title={theme === "light" ? t("darkMode") : t("lightMode")}
      aria-label={theme === "light" ? t("darkMode") : t("lightMode")}
    >
      {theme === "light" ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
      <span className="hidden sm:inline ml-2">
        {theme === "light" ? t("darkMode") : t("lightMode")}
      </span>
    </button>
  );
}

export default ThemeToggle;

