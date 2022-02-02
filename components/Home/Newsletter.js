import React from "react";
import Image from "next/image";
const Newsletter = ({ handleSubscribe }) => {
  const [formData, setFormData] = React.useState({ username: "", email: "" });

  return (
    <div className="mt-14 relative z-0">
      <Image
        src="/newsbg.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="newsletter"
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mt-10 p-14 text-center">
          <h1 className="text-4xl text-black font-bold mb-8 z-50">
            Have the Shloka of the Day delivered to your inbox each morning.
          </h1>
          <form
            className="flex flex-col md:flex-row"
            onSubmit={(e) => {
              if (handleSubscribe(e, formData)) {
                setFormData({ username: "", email: "" });
              }
            }}
          >
            <input
              className="appearance-none z-50 mt-4 md:mt-0 border rounded-md w-full py-3 mr-6 px-3 text-gray-700 leading-tight focus:outline-none focus:border-my-orange dark:bg-white"
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    username: e.target.value,
                  };
                })
              }
              placeholder="Enter Your Name"
            />
            <input
              className="appearance-none z-50 mt-4 md:mt-0 border rounded-md w-full py-3 mr-6  px-3 text-gray-700 leading-tight focus:outline-none  focus:border-my-orange dark:bg-white"
              id="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevData) => {
                  return {
                    ...prevData,
                    email: e.target.value,
                  };
                })
              }
            />
            <button
              type="submit"
              className="bg-my-orange z-50 mt-4 md:mt-0 shadow text-white px-8 py-3 rounded-md hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-my-orange"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
