import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggle = () => {
    const next = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <button onClick={toggle} className="btn-lang">
      {i18n.language === "fr" ? "EN" : "FR"}
    </button>
  );
}
