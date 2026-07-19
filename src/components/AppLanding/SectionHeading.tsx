type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="ui-label mb-3 text-base font-semibold uppercase tracking-[0.14em] text-foreground before:mr-2 before:inline-block before:size-2 before:rounded-full before:bg-primary">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-xl leading-9 text-foreground/75">
          {description}
        </p>
      ) : null}
    </div>
  );
}
