import React from "react";
import classNames from "../../utils/classNames";

export default function Translation({ fontSize }) {
  return (
    <div>
      <h1
        className={classNames(
          fontSize === "large" ? "text-4xl" : "text-3xl",
          "font-extrabold mt-4 dark:text-gray-50"
        )}
      >
        Translation
      </h1>
      <p
        className={classNames(
          fontSize === "large" ? "text-lg" : null,
          "mt-4 mx-auto text-left dark:text-gray-50"
        )}
      >
        Dhritarashtra said: O Sanjay, after gathering on the holy field of
        Kurukshetra, and desiring to fight, what did my sons and the sons of
        Pandu do?
      </p>
    </div>
  );
}
