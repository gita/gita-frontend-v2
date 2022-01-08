import React from "react";
import AuthHeader from "../components/Headers/AuthHeader";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-auth-bg relative">
      <div className="auth-bg" />
      <AuthHeader />
      <div className="flex justify-center items-center w-full">
        <div className="w-max p-12 bg-white rounded-xl shadow-lg z-10">
          <h3 className="text-my-orange font-bold text-center leading-7 text-xl mb-12">
            Welcome to Bhagavad Gita
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
