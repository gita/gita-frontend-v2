"use client";

import { motion } from "framer-motion";

interface FloralCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
  animate?: boolean;
}

export function FloralCorner({
  position = "top-right",
  className = "",
  size = 120,
  animate = true,
}: FloralCornerProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  const rotationMap = {
    "top-left": 0,
    "top-right": 90,
    "bottom-left": -90,
    "bottom-right": 180,
  };

  const FlowerSVG = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      style={{ transform: `rotate(${rotationMap[position]}deg)` }}
    >
      {/* Flower petals */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const x = 60 + 30 * Math.cos(angle);
        const y = 60 + 30 * Math.sin(angle);

        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="18"
            ry="28"
            fill="currentColor"
            opacity="0.25"
            transform={`rotate(${i * 60} ${x} ${y})`}
          />
        );
      })}

      {/* Center */}
      <circle cx="60" cy="60" r="12" fill="currentColor" opacity="0.35" />

      {/* Decorative dots */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const x = 60 + 45 * Math.cos(angle);
        const y = 60 + 45 * Math.sin(angle);

        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill="currentColor"
            opacity="0.3"
          />
        );
      })}

      {/* Leaves/stems */}
      <path
        d="M 10 10 Q 30 30, 45 45"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.2"
        fill="none"
      />
      <circle cx="10" cy="10" r="4" fill="currentColor" opacity="0.25" />
    </svg>
  );

  if (!animate) {
    return (
      <div
        className={`pointer-events-none absolute text-prakash-primary dark:text-nisha-primary ${positionClasses[position]} ${className}`}
        aria-hidden="true"
      >
        {FlowerSVG}
      </div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute text-prakash-primary dark:text-nisha-primary ${positionClasses[position]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.5, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden="true"
    >
      {FlowerSVG}
    </motion.div>
  );
}
