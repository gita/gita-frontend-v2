"use client";

import { ReactNode } from "react";
import { Lightbulb } from "lucide-react";

import { BenefitCard } from "../cards";

import { SectionHeader } from "@/components/ui/section-header";

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ModernRelevanceSectionProps {
  subtitle: string;
  title: string;
  description?: string;
  benefits: Benefit[];
  className?: string;
}

export function ModernRelevanceSection({
  subtitle,
  title,
  description,
  benefits,
  className = "",
}: ModernRelevanceSectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={<Lightbulb className="size-5" />}
          align="center"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
