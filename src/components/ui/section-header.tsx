import { ReactNode } from "react";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  icon?: ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  subtitle,
  title,
  icon,
  description,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "text-center items-center justify-center" : "";

  return (
    <div className={`mb-8 ${className}`}>
      {subtitle && (
        <div
          className={`mb-2 flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}
        >
          {icon}
          <span className="text-sm font-medium uppercase tracking-wider text-prakash-primary dark:text-nisha-primary">
            {subtitle}
          </span>
        </div>
      )}
      <h2
        className={`font-newsreader mb-4 text-3xl font-bold tracking-tight md:text-4xl ${alignClass}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`text-lg text-muted-foreground ${alignClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
