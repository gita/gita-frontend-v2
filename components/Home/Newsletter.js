import React from "react";

const Newsletter = () => {
  return (
    <div className="newsletter mt-14">
      <div className="max-w-5xl mx-auto z-50 px-4 sm:px-6">
        <div className=" mt-10 p-14 text-black text-center	">
          <h1 className="text-4xl font-bold mb-8">
            {" "}
            Have the Shloka of the Day delivered to your inbox each morning.
          </h1>

          <div className="flex flex-col md:flex-row">
          <input
            className="appearance-none mt-4 md:mt-0 border rounded-md w-full py-3 mr-6  px-3 text-gray-700 leading-tight focus:outline-none  focus:border-my-orange"
            id="username"
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            className="appearance-none mt-4 md:mt-0 border rounded-md w-full py-3 mr-6  px-3 text-gray-700 leading-tight focus:outline-none  focus:border-my-orange"
            id="username"
            type="text"
            placeholder="Enter Your Email"
          />
          <button className="bg-my-orange mt-4 md:mt-0 shadow text-white px-8 py-3 rounded-md hover:bg-opacity-75">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
