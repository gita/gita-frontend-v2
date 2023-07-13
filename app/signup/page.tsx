"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../utils/supabase";
import { setNotification } from "../../redux/actions/main";
import {
  SvgEyeCross,
  SvgEyeOpen,
  SvgKey,
  SvgMail,
  SvgUser,
} from "../../components/svgs";

function Signup() {
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const dispatch = useDispatch();
  async function signUpGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          process.env.NEXT_PUBLIC_NODE_ENV == "production"
            ? "https://bhagavadgita.io"
            : "http://localhost:3000"
        }`,
      },
    });
    if (error) {
      dispatch(
        setNotification({
          status: "failed",
          message: error,
        })
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    if (values.password !== values.confirmPassword) {
      setError("Password and confirm password does not match");
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: values.emailAddress as string,
        password: values.password as string,
        options: {
          data: {
            full_name: values.fullName,
          },
          emailRedirectTo: `${
            process.env.NEXT_PUBLIC_NODE_ENV == "production"
              ? "https://bhagavadgita.io"
              : "http://localhost:3000"
          }`,
        },
      });
      if (error) {
        dispatch(
          setNotification({
            status: "failed",
            message: "error singing in please contact admin@bhagavadgita.io",
          })
        );
      } else {
        dispatch(
          setNotification({
            status: "success",
            message: "Please check email for confirmation",
          })
        );
      }
      e.target.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md p-3 focus-within:border-my-orange">
          <SvgUser />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Name
            </label>
            <input
              type={"text"}
              placeholder="Full Name"
              name="fullName"
              className="text-center bg-transparent w-full focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-2 border-2 border-gray-300 mt-2 rounded-md p-3 focus-within:border-my-orange">
          <SvgMail />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Email Address
            </label>
            <input
              type={"email"}
              name="emailAddress"
              placeholder="Email Address"
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
              name="password"
              required
              className="text-center bg-transparent w-full focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="absolute right-2"
            role="toggle password visibility"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <SvgEyeOpen /> : <SvgEyeCross />}
          </button>
        </div>
        <div className="flex items-center relative gap-2 border-2 border-gray-300 mt-2 rounded-md p-3 focus-within:border-my-orange">
          <SvgKey />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Confirm Password
            </label>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              className="text-center bg-transparent w-full focus:outline-none"
              onChange={() => setError("")}
            />
          </div>
          <button
            type="button"
            className="absolute right-2"
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            {isConfirmPasswordVisible ? <SvgEyeOpen /> : <SvgEyeCross />}
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
        <div className="absolute h-12 w-12 font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#FFD3AB] dark:bg-my-orange rounded-full flex items-center justify-center">
          OR
        </div>
      </div>
      <div className="flex justify-center gap-8 mt-4 mb-10">
        {/* will use next/auth for authentication */}
        {/* <SvgGithub className="hover:cursor-pointer" /> */}
        <div
          className="h-9 w-9 relative hover:cursor-pointer"
          onClick={signUpGoogle}
        >
          <Image src="/google-logo.png" layout="fill" alt="google logo" />
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-2 font-normal">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-my-orange hover:cursor-pointer font-bold"
        >
          Login
        </Link>
      </p>
    </>
  );
}

export default Signup;
