import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  SvgEyeCross,
  SvgEyeOpen,
  SvgGithub,
  SvgKey,
  SvgMail,
} from "../components/svgs";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    console.log("login using", values);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md p-3 focus-within:border-my-orange">
          <SvgMail />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Email Address
            </label>
            <input
              type={"email"}
              placeholder="Email Address"
              name="emailAddress"
              className="text-center bg-transparent w-full focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex items-center relative gap-2 border-2 border-gray-300 mt-2 rounded-md p-3 focus-within:border-my-orange">
          <SvgKey />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              className="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="absolute right-2"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <SvgEyeOpen /> : <SvgEyeCross />}
          </button>
        </div>
        <p className="text-right text-sm text-gray-500 mt-2 px-2 font-normal">
          Fogot Password?{" "}
          <span className="text-my-orange hover:cursor-pointer font-bold">
            Click here
          </span>
        </p>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-my-orange text-white font-medium uppercase mt-6 py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
      <div className="px-20 py-10 mt-5 relative">
        <hr className="border-gray-400" />
        <div className="absolute h-12 w-12 font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#FFD3AB] dark:bg-my-orange rounded-full flex items-center justify-center">
          OR
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-4 mb-10">
        {/* will use next/auth for authentication */}
        <SvgGithub className="hover:cursor-pointer" />
        <div className="h-9 w-9 relative cursor-pointer">
          <Image src="/google-logo.png" layout="fill" />
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2 font-normal">
        Don’t have an account?{" "}
        <Link href="/signup">
          <a className="text-my-orange hover:cursor-pointer font-bold">
            Sign up
          </a>
        </Link>
      </p>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
