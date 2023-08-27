import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";

export default function AuthHeader() {
  return (
    <LinkWithLocale
      href="/"
      className="flex items-center gap-3 text-3xl font-bold focus:outline-none"
    >
      <div className="flex items-center justify-center p-8 md:justify-start lg:flex-1">
        <Image
          src="/bhagavad-gita.png"
          height={44}
          width={36}
          alt="gita logo"
        />
        <span className="sr-only">Workflow</span>
        <p className="pl-3">Bhagavad Gita</p>
      </div>
    </LinkWithLocale>
  );
}
