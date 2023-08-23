import { ReactNode } from "react";
import AuthHeader from "../components/Headers/AuthHeader";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-auth-bg dark:bg-dark-bg">
      <div className="auth-bg" />
      <AuthHeader />
      <div className="flex w-full items-center justify-center">
        <div className="z-10 m-2 w-max rounded-xl bg-white p-6 shadow-lg dark:bg-dark-100 md:p-12">
          <h3 className="mb-12 text-center text-xl font-bold leading-7 text-my-orange">
            Welcome to Bhagavad Gita
          </h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
