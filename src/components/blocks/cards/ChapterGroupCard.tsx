"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChapterGroupCardProps {
  title: string;
  chapters: string;
  description: string;
  icon: ReactNode;
  color: "orange" | "amber" | "yellow";
  index?: number;
}

export function ChapterGroupCard({
  title,
  chapters,
  description,
  icon,
  color,
  index = 0,
}: ChapterGroupCardProps) {
  const colorClasses = {
    orange: {
      bg: "bg-orange-50 dark:bg-orange-950/20",
      border: "border-orange-200 dark:border-orange-800",
      badge:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
      icon: "text-orange-600 dark:text-orange-400",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/20",
      border: "border-amber-200 dark:border-amber-800",
      badge:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
      icon: "text-amber-600 dark:text-amber-400",
    },
    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-950/20",
      border: "border-yellow-200 dark:border-yellow-800",
      badge:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
      icon: "text-yellow-600 dark:text-yellow-400",
    },
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card
        className={`h-full border-2 transition-all ${classes.bg} ${classes.border}`}
      >
        <CardHeader>
          <div className="mb-3 flex items-center justify-between">
            <div
              className={`inline-flex size-12 items-center justify-center rounded-lg ${classes.icon}`}
            >
              {icon}
            </div>
            <Badge className={classes.badge}>{chapters}</Badge>
          </div>
          <CardTitle className="font-newsreader text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-merriweather leading-relaxed text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
