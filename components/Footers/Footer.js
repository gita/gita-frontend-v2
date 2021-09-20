import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-24 mb-10 px-8 font-inter border-gray-200 border-t border-b">
      <div className="max-w-3xl mx-auto z-50 px-10 mt-14 sm:px-6">
        <div className="flex text-gray-500 justify-between hover:cursor-pointer">
          <p>About</p>
          <p>Blog</p>
          <p>Donate</p>
          <p>Press</p>
          <p>API</p>
          <p>Contact Us</p>
        </div>

        <div className="flex justify-between max-w-xs my-12 mx-auto hover:cursor-pointer">
          <img src="/facebook.png"/>
          <img src="/instagram.png"/>
          <img src="/twitter.png"/>
          <img src="/github.png"/>

        </div>
      </div>
    </div>
  );
};

export default Footer;
