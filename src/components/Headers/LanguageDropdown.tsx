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
    <div ref={toggleRef} className="relative w-16">
      <div
        className="flex cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <Image
          alt={`Flag for ${locale} locale`}
          src={`/assets/images/locales/${locale}.svg`}
          width={30}
          height={20}
        />
        <ChevronDownIcon className="ml-2 w-12 group-hover:text-black" />
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
