import React from "react";
import AuthLayout from "../layouts/AuthLayout";

const Signup = () => {
  return (
    <div className="">
      <div className="w-full md:w-1/2 p-12 bg-white">Login Page</div>
    </div>
  );
};

export default Signup;

Signup.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
