import { ReactNode } from "react";
import ChapterLayout from "layouts/ChapterLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <ChapterLayout>{children}</ChapterLayout>;
}
