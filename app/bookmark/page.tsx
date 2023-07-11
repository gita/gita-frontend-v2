import Bookmarkcard from "../../components/Shared/BookmarkCard";
import React from "react";

const Bookmark = () => {
  return (
    <div className="bg-gray-400">
      <div className="w-full md:w-1/2 p-12 bg-white">
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
        <Bookmarkcard />
      </div>
    </div>
  );
};

export default Bookmark;
