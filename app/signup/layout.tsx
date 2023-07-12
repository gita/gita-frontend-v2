import AuthLayout from "../../layouts/AuthLayout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
