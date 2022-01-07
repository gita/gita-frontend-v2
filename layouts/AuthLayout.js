import React from "react";
import AuthHeader from "../components/Headers/AuthHeader";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-full bg-auth-bg">
      <div className="auth-bg" />
      <AuthHeader />
      <div className="flex justify-center items-center w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
