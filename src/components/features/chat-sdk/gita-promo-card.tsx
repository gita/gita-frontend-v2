"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface GitaPromoCardProps {
  className?: string;
}

export function GitaPromoCard({ className }: GitaPromoCardProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group block overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-sm",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[2.5/1] w-full overflow-hidden">
        <Image
          src="/art/bg_krishnaji_landscape.webp"
          alt="Lord Krishna"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 256px) 100vw, 256px"
        />
      </div>
      
      {/* Content */}
      <div className="p-2.5">
        <p className="text-[13px] font-medium text-foreground">
          Bhagavad Gita in Hindi & English
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          With commentaries from 20+ scholars
        </p>
        
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary transition-colors group-hover:text-primary/80">
          <span>Start Reading</span>
          <ArrowRight className="size-3.5" />
        </div>
      </div>
    </Link>
  );
}

