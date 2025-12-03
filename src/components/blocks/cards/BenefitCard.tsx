"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export function BenefitCard({
  icon,
  title,
  description,
  index = 0,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full border-2 transition-all hover:border-prakash-primary hover:shadow-lg dark:hover:border-nisha-primary">
        <CardHeader>
          <div className="mb-3 inline-flex size-12 items-center justify-center rounded-lg bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
            {icon}
          </div>
          <CardTitle className="font-newsreader text-xl">{title}</CardTitle>
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
