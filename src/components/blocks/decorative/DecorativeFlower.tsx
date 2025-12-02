"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface DecorativeFlowerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  className?: string;
  animate?: boolean;
}

export function DecorativeFlower({
  position = "top-right",
  size = 120,
  className = "",
  animate = true,
}: DecorativeFlowerProps) {
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

  const FlowerImage = (
    <Image
      src="/flower.svg"
      alt=""
      width={size}
      height={size}
      className="opacity-30 dark:opacity-20"
      style={{ transform: `rotate(${rotationMap[position]}deg)` }}
      aria-hidden="true"
    />
  );

  if (!animate) {
    return (
      <div className={`pointer-events-none absolute ${positionClasses[position]} ${className}`}>
        {FlowerImage}
      </div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none absolute ${positionClasses[position]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {FlowerImage}
    </motion.div>
  );
}

