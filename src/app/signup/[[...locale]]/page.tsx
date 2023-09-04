"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

import LinkWithLocale from "components/LinkWithLocale";
import {
  SvgEyeCross,
  SvgEyeOpen,
  SvgKey,
  SvgMail,
  SvgUser,
} from "components/svgs";
import { setNotification } from "redux/actions/main";
import { supabase } from "utils/supabase";

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
          message: String(error),
        }),
      );
    }
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
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
          }),
        );
      } else {
        dispatch(
          setNotification({
            status: "success",
            message: "Please check email for confirmation",
          }),
        );
      }
      evt.currentTarget.reset();
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 rounded-md border-2 border-gray-300 p-3 focus-within:border-my-orange">
          <SvgUser />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Name
            </label>
            <input
              type={"text"}
              placeholder="Full Name"
              name="fullName"
              className="w-full bg-transparent text-center focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-md border-2 border-gray-300 p-3 focus-within:border-my-orange">
          <SvgMail />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Email Address
            </label>
            <input
              type={"email"}
              name="emailAddress"
              placeholder="Email Address"
              className="w-full bg-transparent text-center focus:outline-none"
              required
            />
          </div>
        </div>
        <div className="relative mt-2 flex items-center gap-2 rounded-md border-2 border-gray-300 p-3 focus-within:border-my-orange">
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
              className="w-full bg-transparent text-center focus:outline-none"
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
        <div className="relative mt-2 flex items-center gap-2 rounded-md border-2 border-gray-300 p-3 focus-within:border-my-orange">
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
              className="w-full bg-transparent text-center focus:outline-none"
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
          <p className="mt-2 w-full text-center text-xs text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          role="submit form"
          className="mt-6 w-full rounded-md bg-my-orange px-4 py-2 font-medium uppercase text-white"
        >
          Signup
        </button>
      </form>
      <div className="relative mt-5 px-20 py-10">
        <hr className="border-gray-400" />
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFD3AB] font-medium dark:bg-my-orange">
          OR
        </div>
      </div>
      <div className="mb-10 mt-4 flex justify-center gap-8">
        {/* will use next/auth for authentication */}
        {/* <SvgGithub className="hover:cursor-pointer" /> */}
        <div
          className="relative h-9 w-9 hover:cursor-pointer"
          onClick={signUpGoogle}
        >
          <Image src="/google-logo.png" fill alt="google logo" />
        </div>
      </div>
      <p className="mt-2 text-center text-sm font-normal text-gray-500">
        Already have an account?{" "}
        <LinkWithLocale
          href="/login"
          className="font-bold text-my-orange hover:cursor-pointer"
        >
          Login
        </LinkWithLocale>
      </p>
    </>
  );
}

export default Signup;
