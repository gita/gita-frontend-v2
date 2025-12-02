"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MandalaPatternProps {
  className?: string;
  opacity?: number;
  size?: number;
  animate?: boolean;
}

export function MandalaPattern({
  className = "",
  opacity = 0.08,
  size = 600,
  animate = false,
}: MandalaPatternProps) {
  const mandalaElement = (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <Image
        src="/mandala.png"
        alt=""
        width={size}
        height={size}
        className="dark:opacity-60"
        style={{ opacity }}
      />
    </div>
  );

  if (!animate) {
    return mandalaElement;
  }

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: opacity, rotate: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      <Image
        src="/mandala.png"
        alt=""
        width={size}
        height={size}
        className="dark:opacity-60"
      />
    </motion.div>
  );
}

