import React from "react";
import { useDispatch } from "react-redux";
import { setLang } from "@/app/store";
import { useSelector } from "react-redux";
import "./LanguageSelector.css";

import englishFlag from "../../assets/Flags/english.png";
import germanFlag from "../../assets/Flags/german.png";
import spanishFlag from "../../assets/Flags/spanish.png";
import frenchFlag from "../../assets/Flags/french.png";

const flags = {
  "en-US": englishFlag,
  "de-DE": germanFlag,
  "es-ES": spanishFlag,
  "fr-FR": frenchFlag,
};

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state.locale.currentLang);

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLang(event.target.value));
  };

  return (
    <div className="language-selector">
      <label htmlFor="lang-select">Language:</label>
      <select
        id="lang-select"
        defaultValue={lang}
        value={lang}
        onChange={handleLangChange}
      >
        {Object.entries(flags).map(([langCode, flagSrc]) => (
          <option key={langCode} value={langCode}>
            {/* <img src={flagSrc} alt={langCode} className="flag-icon" /> */}
            {langCode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
