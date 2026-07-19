import { AppDetails } from "./AppDetails";
import { AppFaq } from "./AppFaq";
import { AppFeatures } from "./AppFeatures";
import { AppHero } from "./AppHero";
import type { AppLandingCopy } from "./content";

export function AppLandingPage({ copy }: { copy: AppLandingCopy }) {
  return (
    <article lang={copy.locale}>
      <AppHero copy={copy} />
      <AppFeatures copy={copy} />
      <AppDetails copy={copy} />
      <AppFaq copy={copy} />
    </article>
  );
}
