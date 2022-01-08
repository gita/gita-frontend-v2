import Link from "next/link";
import React, { useState } from "react";
import { EyeOpenSvg, KeySvg, MailSvg, UserSvg } from "../components/svg";
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
            <EyeOpenSvg />
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
            <EyeOpenSvg />
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
        <svg
          width="36"
          height="34"
          viewBox="0 0 36 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0002 0C8.37494 0 0.569824 7.80367 0.569824 17.4304C0.569824 25.1316 5.56416 31.6653 12.4898 33.97C13.3609 34.1314 13.6807 33.5919 13.6807 33.1315C13.6807 32.7159 13.6646 31.3428 13.657 29.8864C8.8079 30.9408 7.78467 27.8298 7.78467 27.8298C6.99177 25.8151 5.84934 25.2794 5.84934 25.2794C4.26788 24.1976 5.96855 24.2198 5.96855 24.2198C7.71886 24.3427 8.64049 26.016 8.64049 26.016C10.1951 28.6807 12.7181 27.9103 13.7128 27.465C13.8692 26.3384 14.3209 25.5695 14.8194 25.1342C10.9479 24.6934 6.87805 23.1989 6.87805 16.52C6.87805 14.617 7.55895 13.0621 8.67397 11.8415C8.49299 11.4024 7.89637 9.62961 8.84282 7.2287C8.84282 7.2287 10.3065 6.76024 13.6374 9.01538C15.0278 8.62918 16.5189 8.4355 18.0002 8.42887C19.4815 8.4355 20.9738 8.62918 22.3668 9.01538C25.6936 6.76024 27.1553 7.2287 27.1553 7.2287C28.1041 9.62961 27.5071 11.4024 27.3262 11.8415C28.4438 13.0621 29.1201 14.617 29.1201 16.52C29.1201 23.2147 25.0425 24.6888 21.1611 25.1203C21.7863 25.6613 22.3434 26.722 22.3434 28.3482C22.3434 30.6804 22.3232 32.5574 22.3232 33.1315C22.3232 33.5954 22.6369 34.1389 23.5205 33.9677C30.4423 31.6603 35.4303 25.129 35.4303 17.4304C35.4303 7.80367 27.6264 0 18.0002 0ZM7.09807 24.83C7.05968 24.9166 6.92344 24.9425 6.79933 24.8831C6.6729 24.8262 6.6019 24.7082 6.64289 24.6213C6.68041 24.5321 6.81694 24.5073 6.94307 24.567C7.06979 24.6239 7.14194 24.7431 7.09807 24.83ZM7.95545 25.595C7.87232 25.6721 7.70982 25.6363 7.59956 25.5145C7.48555 25.3929 7.46419 25.2304 7.54847 25.1522C7.6342 25.0752 7.79179 25.1112 7.9061 25.2327C8.02011 25.3557 8.04233 25.5171 7.95545 25.595ZM8.54365 26.5738C8.43685 26.648 8.26223 26.5784 8.15427 26.4234C8.04748 26.2684 8.04748 26.0826 8.15658 26.0081C8.26482 25.9336 8.43685 26.0006 8.54625 26.1544C8.65275 26.312 8.65275 26.4979 8.54365 26.5738ZM9.53841 27.7074C9.44287 27.8128 9.23938 27.7845 9.09045 27.6408C8.93804 27.5002 8.89561 27.3008 8.99144 27.1954C9.08814 27.0898 9.29278 27.1195 9.44287 27.2621C9.59412 27.4024 9.6403 27.6032 9.53841 27.7074ZM10.8241 28.0901C10.7819 28.2267 10.5859 28.2887 10.3885 28.2307C10.1914 28.171 10.0623 28.0111 10.1022 27.8731C10.1432 27.7357 10.34 27.671 10.5389 27.7331C10.7357 27.7926 10.865 27.9513 10.8241 28.0901ZM12.2872 28.2525C12.2921 28.3962 12.1247 28.5154 11.9174 28.518C11.709 28.5226 11.5405 28.4063 11.5381 28.2649C11.5381 28.1197 11.7018 28.0016 11.9102 27.9982C12.1174 27.9941 12.2872 28.1096 12.2872 28.2525ZM13.7245 28.1974C13.7493 28.3377 13.6053 28.4817 13.3995 28.5201C13.1972 28.557 13.0098 28.4704 12.9841 28.3313C12.959 28.1876 13.1057 28.0435 13.3077 28.0063C13.5138 27.9705 13.6982 28.0548 13.7245 28.1974Z"
            fill="#161614"
          />
        </svg>
        <svg
          width="36"
          height="34"
          viewBox="0 0 36 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0002 0C8.37494 0 0.569824 7.80367 0.569824 17.4304C0.569824 25.1316 5.56416 31.6653 12.4898 33.97C13.3609 34.1314 13.6807 33.5919 13.6807 33.1315C13.6807 32.7159 13.6646 31.3428 13.657 29.8864C8.8079 30.9408 7.78467 27.8298 7.78467 27.8298C6.99177 25.8151 5.84934 25.2794 5.84934 25.2794C4.26788 24.1976 5.96855 24.2198 5.96855 24.2198C7.71886 24.3427 8.64049 26.016 8.64049 26.016C10.1951 28.6807 12.7181 27.9103 13.7128 27.465C13.8692 26.3384 14.3209 25.5695 14.8194 25.1342C10.9479 24.6934 6.87805 23.1989 6.87805 16.52C6.87805 14.617 7.55895 13.0621 8.67397 11.8415C8.49299 11.4024 7.89637 9.62961 8.84282 7.2287C8.84282 7.2287 10.3065 6.76024 13.6374 9.01538C15.0278 8.62918 16.5189 8.4355 18.0002 8.42887C19.4815 8.4355 20.9738 8.62918 22.3668 9.01538C25.6936 6.76024 27.1553 7.2287 27.1553 7.2287C28.1041 9.62961 27.5071 11.4024 27.3262 11.8415C28.4438 13.0621 29.1201 14.617 29.1201 16.52C29.1201 23.2147 25.0425 24.6888 21.1611 25.1203C21.7863 25.6613 22.3434 26.722 22.3434 28.3482C22.3434 30.6804 22.3232 32.5574 22.3232 33.1315C22.3232 33.5954 22.6369 34.1389 23.5205 33.9677C30.4423 31.6603 35.4303 25.129 35.4303 17.4304C35.4303 7.80367 27.6264 0 18.0002 0ZM7.09807 24.83C7.05968 24.9166 6.92344 24.9425 6.79933 24.8831C6.6729 24.8262 6.6019 24.7082 6.64289 24.6213C6.68041 24.5321 6.81694 24.5073 6.94307 24.567C7.06979 24.6239 7.14194 24.7431 7.09807 24.83ZM7.95545 25.595C7.87232 25.6721 7.70982 25.6363 7.59956 25.5145C7.48555 25.3929 7.46419 25.2304 7.54847 25.1522C7.6342 25.0752 7.79179 25.1112 7.9061 25.2327C8.02011 25.3557 8.04233 25.5171 7.95545 25.595ZM8.54365 26.5738C8.43685 26.648 8.26223 26.5784 8.15427 26.4234C8.04748 26.2684 8.04748 26.0826 8.15658 26.0081C8.26482 25.9336 8.43685 26.0006 8.54625 26.1544C8.65275 26.312 8.65275 26.4979 8.54365 26.5738ZM9.53841 27.7074C9.44287 27.8128 9.23938 27.7845 9.09045 27.6408C8.93804 27.5002 8.89561 27.3008 8.99144 27.1954C9.08814 27.0898 9.29278 27.1195 9.44287 27.2621C9.59412 27.4024 9.6403 27.6032 9.53841 27.7074ZM10.8241 28.0901C10.7819 28.2267 10.5859 28.2887 10.3885 28.2307C10.1914 28.171 10.0623 28.0111 10.1022 27.8731C10.1432 27.7357 10.34 27.671 10.5389 27.7331C10.7357 27.7926 10.865 27.9513 10.8241 28.0901ZM12.2872 28.2525C12.2921 28.3962 12.1247 28.5154 11.9174 28.518C11.709 28.5226 11.5405 28.4063 11.5381 28.2649C11.5381 28.1197 11.7018 28.0016 11.9102 27.9982C12.1174 27.9941 12.2872 28.1096 12.2872 28.2525ZM13.7245 28.1974C13.7493 28.3377 13.6053 28.4817 13.3995 28.5201C13.1972 28.557 13.0098 28.4704 12.9841 28.3313C12.959 28.1876 13.1057 28.0435 13.3077 28.0063C13.5138 27.9705 13.6982 28.0548 13.7245 28.1974Z"
            fill="#161614"
          />
        </svg>
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
