"use client";

import { motion } from "framer-motion";

interface VedicPatternProps {
  variant?: "mandala" | "lotus" | "om" | "dots";
  className?: string;
  size?: number;
  opacity?: number;
  animate?: boolean;
}

export function VedicPattern({
  variant = "mandala",
  className = "",
  size = 200,
  opacity = 0.15,
  animate = true,
}: VedicPatternProps) {
  const renderPattern = () => {
    switch (variant) {
      case "mandala":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
            {/* Outer circle */}
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            
            {/* Petals */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = Math.round((100 + 60 * Math.cos(angle)) * 100) / 100;
              const y1 = Math.round((100 + 60 * Math.sin(angle)) * 100) / 100;
              const x2 = Math.round((100 + 90 * Math.cos(angle)) * 100) / 100;
              const y2 = Math.round((100 + 90 * Math.sin(angle)) * 100) / 100;
              
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.5"
                  />
                  <circle cx={x2} cy={y2} r="8" fill="currentColor" opacity="0.3" />
                </g>
              );
            })}
            
            {/* Inner design */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x = Math.round((100 + 45 * Math.cos(angle)) * 100) / 100;
              const y = Math.round((100 + 45 * Math.sin(angle)) * 100) / 100;
              return <circle key={i} cx={x} cy={y} r="3" fill="currentColor" opacity="0.4" />;
            })}
            
            {/* Center */}
            <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.4" />
            <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.6" />
          </svg>
        );
      
      case "lotus":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
            {/* Lotus petals */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x = Math.round((100 + 50 * Math.cos(angle)) * 100) / 100;
              const y = Math.round((100 + 50 * Math.sin(angle)) * 100) / 100;
              
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx="25"
                  ry="40"
                  fill="currentColor"
                  opacity="0.25"
                  transform={`rotate(${i * 45} ${x} ${y})`}
                />
              );
            })}
            <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.4" />
          </svg>
        );
      
      case "om":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
            {/* Simplified Om symbol */}
            <path
              d="M 60 100 Q 80 60, 100 80 Q 120 100, 140 80 Q 160 60, 180 100"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              opacity="0.4"
            />
            <circle cx="100" cy="120" r="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
            <path
              d="M 100 150 Q 120 170, 100 180 Q 80 170, 100 150"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        );
      
      case "dots":
        return (
          <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
            {[...Array(5)].map((_, row) =>
              [...Array(5)].map((_, col) => {
                const x = 40 + col * 30;
                const y = 40 + row * 30;
                const radius = (row + col) % 2 === 0 ? 4 : 6;
                return (
                  <circle
                    key={`${row}-${col}`}
                    cx={x}
                    cy={y}
                    r={radius}
                    fill="currentColor"
                    opacity="0.3"
                  />
                );
              })
            )}
          </svg>
        );
    }
  };

  if (!animate) {
    return (
      <div
        className={`pointer-events-none text-prakash-primary dark:text-nisha-primary ${className}`}
        style={{ opacity }}
        aria-hidden="true"
      >
        {renderPattern()}
      </div>
    );
  }

  return (
    <motion.div
      className={`pointer-events-none text-prakash-primary dark:text-nisha-primary ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      aria-hidden="true"
    >
      {renderPattern()}
    </motion.div>
  );
}

