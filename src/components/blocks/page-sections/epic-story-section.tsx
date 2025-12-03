"use client";

import { motion } from "framer-motion";
import { Heart, Swords, Users2 } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface EpicStorySectionProps {
  subtitle: string;
  title: string;
  introduction: string;
  storyPoints: {
    icon: "pandavas" | "kauravas" | "dilemma";
    title: string;
    description: string;
  }[];
  conclusion: string;
  className?: string;
}

export function EpicStorySection({
  subtitle,
  title,
  introduction,
  storyPoints,
  conclusion,
  className = "",
}: EpicStorySectionProps) {
  const iconMap = {
    pandavas: <Users2 className="size-8" />,
    kauravas: <Swords className="size-8" />,
    dilemma: <Heart className="size-8" />,
  };

  return (
    <section className={`relative overflow-hidden py-16 md:py-20 ${className}`}>
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <SectionHeader subtitle={subtitle} title={title} align="center" />

        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-merriweather mb-12 text-center text-lg leading-relaxed text-muted-foreground"
          >
            {introduction}
          </motion.p>

          <div className="grid gap-8 md:grid-cols-3">
            {storyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full border-2 transition-all hover:border-prakash-primary hover:shadow-lg dark:hover:border-nisha-primary">
                  <CardContent className="p-10 text-center">
                    <div className="mb-6 inline-flex size-20 items-center justify-center rounded-full bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
                      {iconMap[point.icon]}
                    </div>
                    <h3 className="font-newsreader mb-5 text-2xl font-bold">
                      {point.title}
                    </h3>
                    <p className="font-merriweather text-base leading-relaxed text-muted-foreground">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-merriweather mt-12 text-center text-lg leading-relaxed text-muted-foreground"
          >
            {conclusion}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
