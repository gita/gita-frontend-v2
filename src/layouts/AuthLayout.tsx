import { ReactNode } from "react";
import AuthHeader from "../components/Headers/AuthHeader";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-auth-bg dark:bg-dark-bg relative">
      <div className="auth-bg" />
      <AuthHeader />
      <div className="flex justify-center items-center w-full">
        <div className="w-max m-2 p-6 md:p-12 bg-white dark:bg-dark-100 rounded-xl shadow-lg z-10">
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
