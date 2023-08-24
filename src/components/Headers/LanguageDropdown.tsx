import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { ChevronDownIcon } from "@heroicons/react/solid";

import { useClickOutside } from "hooks/useClickOutside";
import classNames from "utils/classNames";

const languages = [
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
  align: "left" | "right";
};

function LanguageDropdown(props: Props) {
  const { align } = props;

  const [showMenu, setShowMenu] = useState(false);

  const [cookies, setCookie] = useCookies(["locale"]);

  const toggleRef = useRef<HTMLDivElement>(null);
  useClickOutside([toggleRef], () => setShowMenu(false));

  return (
    <div ref={toggleRef} className="relative">
      <div
        className="flex cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div>{(cookies.locale || "en").toUpperCase()}</div>
        <ChevronDownIcon className="ml-2 h-5 w-5 group-hover:text-black" />
      </div>
      {showMenu && (
        <div
          className={classNames(
            "absolute top-8 w-24 cursor-pointer border bg-white dark:bg-dark-100",
            align === "left" ? "left-0" : "right-0",
          )}
        >
          {languages.map((language) => (
            <div
              key={language.locale}
              className="border-b px-3 py-2 last:border-b-0 hover:bg-slate-400 dark:hover:bg-slate-700"
            >
              {language.language}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
