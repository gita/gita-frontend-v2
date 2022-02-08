import React from "react";

export default function Translation({ translationData }) {
  return (
    <div>
      <h1 className="font-extrabold text-3xl dark:text-gray-50">Translation</h1>
      <p className="mt-4 mx-auto text-justify dark:text-gray-50">
        {translationData?.description}
      </p>
    </div>
  );
}
