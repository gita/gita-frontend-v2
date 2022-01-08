import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  EyeCrossSvg,
  EyeOpenSvg,
  GithubSvg,
  KeySvg,
  MailSvg,
  UserSvg,
} from "../components/svg";
import AuthLayout from "../layouts/AuthLayout";

const Signup = () => {
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());
    if (values.password !== values.confirmPassword) {
      setError("Password and confirm password does not match");
    } else {
      console.log("Signup using", values, values.fullName);
      e.target.reset();
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md p-3 focus-within:border-my-orange">
          <UserSvg />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Name
            </label>
            <input
              type={"text"}
              placeholder="Full Name"
              name="fullName"
              className="text-center w-full focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-2 border-2 border-gray-300 mt-2 rounded-md p-3 focus-within:border-my-orange">
          <MailSvg />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Email Address
            </label>
            <input
              type={"email"}
              name="emailAddress"
              placeholder="Email Address"
              className="text-center w-full focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-2 border-2 border-gray-300 mt-2 rounded-md p-3 focus-within:border-my-orange">
          <KeySvg />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              className="text-center w-full focus:outline-none"
            />
          </div>
          <button
            type="button"
            role="toggle password visibility"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <EyeOpenSvg /> : <EyeCrossSvg />}
          </button>
        </div>
        <div className="flex items-center gap-2 border-2 border-gray-300 mt-2 rounded-md p-3 focus-within:border-my-orange">
          <KeySvg />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Confirm Password
            </label>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              className="text-center w-full focus:outline-none"
              onChange={() => setError("")}
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? <EyeOpenSvg /> : <EyeCrossSvg />}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-2 text-center w-full">
            {error}
          </p>
        )}

        <button
          type="submit"
          role="submit form"
          className="w-full bg-my-orange text-white font-medium uppercase mt-6 py-2 px-4 rounded-md"
        >
          Signup
        </button>
      </form>
      <div className="px-20 py-10 mt-5 relative">
        <hr className="border-gray-400" />
        <div className="absolute h-12 w-12 font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#FFD3AB] rounded-full flex items-center justify-center">
          OR
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-4 mb-10">
        {/* will use next/auth for authentication */}
        <GithubSvg />
        <div className="h-9 w-9 relative">
          <Image src="/google-logo.png" layout="fill" />
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2 font-normal">
        Already have an account?{" "}
        <Link href="/login">
          <a className="text-my-orange hover:cursor-pointer font-bold">Login</a>
        </Link>
      </p>
    </>
  );
};

export default Signup;

Signup.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
