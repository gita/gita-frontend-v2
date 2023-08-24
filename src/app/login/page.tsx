"use client";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  SvgEyeCross,
  SvgEyeOpen,
  SvgGithub,
  SvgKey,
  SvgMail,
} from "../../components/svgs";
import { setNotification } from "../../redux/actions/main";
import { supabase } from "../../utils/supabase";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.emailAddress as string,
      password: values.password as string,
    });

    if (error) {
      dispatch(
        setNotification({
          status: "failed",
          message: "error singing in please contact admin@bhagavadgita.io",
        }),
      );
    } else if (data) {
      setCookie("access_token", data.session.access_token);

      dispatch(
        setNotification({
          status: "success",
          message: "Hare Krishna Dear Devotee, you're signed in now",
        }),
      );
      router.push("/");
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 rounded-md border-2 border-gray-300 p-3 focus-within:border-my-orange">
          <SvgMail />
          <div className="flex-1">
            <label htmlFor="name" hidden aria-hidden="true">
              Email Address
            </label>
            <input
              type={"email"}
              placeholder="Email Address"
              name="emailAddress"
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
              required
              name="password"
              className="w-full bg-transparent text-center focus:outline-none"
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
        <p className="mt-2 px-2 text-right text-sm font-normal text-gray-500">
          Fogot Password?{" "}
          <span className="font-bold text-my-orange hover:cursor-pointer">
            Click here
          </span>
        </p>
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-my-orange px-4 py-2 font-medium uppercase text-white"
        >
          Login
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
        <SvgGithub className="hover:cursor-pointer" />
        <div className="relative h-9 w-9 cursor-pointer">
          <Image src="/google-logo.png" fill alt="google logo" />
        </div>
      </div>
      <p className="mt-2 text-center text-sm font-normal text-gray-500">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-my-orange hover:cursor-pointer"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default Login;
