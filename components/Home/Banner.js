import React from "react";

const Banner = () => {
  return (
    <>
      <div className="max-w-7xl rounded-lg mx-auto px-4 sm:px-6 z-50">
        <div className="banner flex flex-col h-4/5 py-36">
          <h1 className="text-5xl text-center font-bold text-shadow text-white t-shadow">
            Experice the Gita
          </h1>
          <h1 className="text-5xl text-center font-bold text-shadow text-lead-text t-shadow">
            Anywhere, Anytime
          </h1>
         
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border  mx-auto mt-4 max-w-max border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
          >
           Read Now
          </button>
        </div>
      </div>
      <div className="yellow-bg-banner absolute z-0 h-96 -mt-60 w-full"></div>
    </>
  );
};

export default Banner;

