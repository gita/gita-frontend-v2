import type { AppLandingCopy } from "./content";
import { SectionHeading } from "./SectionHeading";
import { StoreButtons } from "./StoreButtons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AppFaq({ copy }: { copy: AppLandingCopy }) {
  return (
    <>
      <section
        id="faq"
        className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-24"
      >
        <SectionHeading
          eyebrow={copy.faq.eyebrow}
          title={copy.faq.title}
          centered
        />
        <Accordion
          type="single"
          collapsible
          className="mt-12 overflow-hidden rounded-2xl border border-border/80 bg-card px-5 shadow-sm sm:px-8"
        >
          {copy.faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-6 text-left text-xl leading-8 hover:text-primary hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pr-7 text-lg leading-8 text-foreground/75">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-t-4 border-primary bg-secondary/55 dark:bg-accent/70">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="sanskrit-verse text-3xl text-primary" lang="sa">
            ॐ
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            {copy.cta.title}
          </h2>
          <p className="mt-5 max-w-2xl text-xl leading-9 text-foreground/75">
            {copy.cta.description}
          </p>
          <StoreButtons labels={copy.storeLabels} className="mt-8" />
        </div>
      </section>
    </>
  );
}
