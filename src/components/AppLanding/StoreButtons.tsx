import Image from "next/image";
import Link from "next/link";

import { APP_STORE_URL, GOOGLE_PLAY_URL } from "./content";

import { cn } from "@/lib/utils";

type StoreButtonsProps = {
  labels: { google: string; apple: string };
  className?: string;
};

export function StoreButtons({ labels, className }: StoreButtonsProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3 sm:gap-4", className)}
    >
      <Link
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.google}
        className="touch-manipulation rounded-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <Image
          src="/play_store.svg"
          alt={labels.google}
          width={180}
          height={52}
          className="h-12 w-auto sm:h-[52px]"
        />
      </Link>
      <Link
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.apple}
        className="touch-manipulation rounded-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none"
      >
        <Image
          src="/app_store.svg"
          alt={labels.apple}
          width={180}
          height={52}
          className="h-12 w-auto sm:h-[52px]"
        />
      </Link>
    </div>
  );
}
