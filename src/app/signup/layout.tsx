import { ReactNode } from "react";

import AuthLayout from "../../layouts/AuthLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
