import { cloneElement, useState } from "react";
import Footer from "../components/Footers/Footer";
import PageHeader from "../components/Headers/PageHeader";

const PagesLayout = ({ children }) => {
  const [advanceSettings, setAdvanceSettings] = useState({
    devnagari: true,
    verseText: true,
    synonyms: true,
    translation: true,
    purport: true,
  });
  const [languageSettings, setLanguageSettings] = useState({
    isCommentarySourceEnabled: false,
    language: {
      id: 1,
      language: "english",
    },
    author: {
      id: 1,
      name: "Swami Ramsukhdas",
    },
  });

  return (
    <div className="dark:bg-dark-bg min-h-screen flex flex-col justify-between">
      <PageHeader
        advanceSettings={advanceSettings}
        setAdvanceSettings={setAdvanceSettings}
        languageSettings={languageSettings}
        setLanguageSettings={setLanguageSettings}
      />
      <div className="flex-1">
        {/* to fix footer when no data */}
        {cloneElement(children, { advanceSettings, languageSettings })}
      </div>
      <Footer />
    </div>
  );
};

export default PagesLayout;
