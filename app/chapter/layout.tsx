import ChapterLayout from "../../layouts/ChapterLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ChapterLayout>{children}</ChapterLayout>;
}
