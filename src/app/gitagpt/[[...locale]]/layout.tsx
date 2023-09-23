"use client";

import React, { useEffect, useState } from "react";

import ChatbotLayout from "layouts/ChatbotLayout";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

interface LayoutProps {
  params: any;
  children: React.ReactNode;
}

const GitaGPTLayout: React.FC<LayoutProps> = ({ params, children }) => {
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const locale = paramsToLocale(params);

  useEffect(() => {
    const loadTranslations = async () => {
      const loadedTranslations = await getTranslations(locale);
      setTranslations(loadedTranslations);
    };

    loadTranslations();
  }, [locale]);

  return (
    <ChatbotLayout locale={locale} translations={translations}>
      {children}
    </ChatbotLayout>
  );
};

export default GitaGPTLayout;
