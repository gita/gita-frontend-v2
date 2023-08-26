import Link from "next/link";

import { getLocaleFromPath } from "./shared/functions";

function LinkWithLocale({
  href,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  const locale = getLocaleFromPath();
  return (
    <Link href={locale === "en" ? href : `${href}/${locale}`} {...props}>
      {children}
    </Link>
  );
}

export default LinkWithLocale;
