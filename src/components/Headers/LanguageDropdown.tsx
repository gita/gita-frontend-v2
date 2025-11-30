import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

import { updatedLocalePath } from "components/shared/functions";
import { useClickOutside } from "hooks/useClickOutside";
import { classNames } from "shared/functions";

const languages: {
  locale: Locale;
  language: string;
}[] = [
  {
    locale: "en",
    language: "English",
  },
  {
    locale: "hi",
    language: "हिंदी",
  },
];

type Props = {
  locale: Locale;
  align: "left" | "right";
};

function LanguageDropdown(props: Props) {
  const { locale, align } = props;

  const [showMenu, setShowMenu] = useState(false);

  const [, setCookie] = useCookies(["locale"]);

  const toggleRef = useRef<HTMLDivElement>(null);
  useClickOutside([toggleRef], () => setShowMenu(false));

  return (
    <div ref={toggleRef} className="relative">
      <div
        className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Image
          alt={`Flag for ${locale} locale`}
          src={`/assets/images/locales/${locale}.svg`}
          width={24}
          height={16}
          className="rounded-sm"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {languages.find((l) => l.locale === locale)?.language}
        </span>
        <ChevronDownIcon className="size-4 text-gray-500 dark:text-gray-400" />
      </div>
      {showMenu && (
        <div
          className={classNames(
            "absolute top-8 z-10 w-32 cursor-pointer border bg-white dark:bg-dark-100",
            align === "left" ? "left-0" : "right-0",
          )}
        >
          {languages.map((language) => (
            <div
              key={language.locale}
              className="flex gap-3 border-b px-3 py-2 last:border-b-0 hover:bg-slate-400 dark:hover:bg-slate-700"
              onClick={() => {
                if (language.locale !== locale) {
                  setCookie("locale", language.locale);
                  window.location.href = updatedLocalePath(language.locale);
                }
                setShowMenu(false);
              }}
            >
              <Image
                alt={`Flag for ${language.locale} locale`}
                src={`/assets/images/locales/${language.locale}.svg`}
                width={30}
                height={20}
              />
              {language.language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
