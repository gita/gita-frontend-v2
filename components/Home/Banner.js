import React from "react";

const Banner = () => {
  return (
    <>
      <div className="max-w-7xl rounded-lg mx-auto px-4 sm:px-6 z-50">
        <div className="banner flex flex-col h-4/5 py-36">
          <h1 className="text-5xl text-center font-bold text-white t-shadow">
            Experice the Gita
          </h1>
          <h1 className="text-5xl text-center font-bold text-yellow-300 t-shadow">
            Anywhere, Anytime
          </h1>
          <button className="bg-white text-center mx-auto  max-w-max px-8 py-3 mt-4 rounded-md">
            Read Now
          </button>
        </div>
      </div>
      <div className="yellow-bg-banner absolute z-0 h-96 -mt-60 w-full"></div>
    </>
  );
};

export default Banner;
