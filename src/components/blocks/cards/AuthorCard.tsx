"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

interface AuthorCardProps {
  name: string;
  role: string;
  description: string[];
  icon?: ReactNode;
  imagePlaceholder?: string;
  index?: number;
}

export function AuthorCard({
  name,
  role,
  description,
  icon,
  imagePlaceholder = "/placeholder-author.png",
  index = 0,
}: AuthorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-2 transition-all hover:border-prakash-primary hover:shadow-lg dark:hover:border-nisha-primary">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-prakash-primary/10 text-prakash-primary dark:bg-nisha-primary/10 dark:text-nisha-primary">
              {icon || (
                <svg
                  className="size-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-newsreader mb-1 text-2xl font-bold">
                {name}
              </h3>
              <p className="text-sm font-medium uppercase tracking-wide text-prakash-primary dark:text-nisha-primary">
                {role}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {description.map((para, idx) => (
              <p
                key={idx}
                className="font-merriweather leading-relaxed text-muted-foreground"
              >
                {para}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

