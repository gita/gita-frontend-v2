import React from "react";

export default function Commentary({ commentaryData }) {
  return (
    <div>
      <h1 className="font-extrabold text-3xl mt-4 dark:text-gray-50">
        Commentary
      </h1>
      <p className="mt-4 mx-auto text-left dark:text-gray-50">
        {commentaryData?.description}
      </p>
    </div>
  );
}
