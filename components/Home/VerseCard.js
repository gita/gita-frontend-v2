import React from "react";
import Link from "next/link";

const VerseCard = () => {
  return (
    <Link href="/verse">
      <div className="bg-white shadow-xl  border-2 border-white mt-6 rounded-md p-6 hover:bg-box-bg hover:shadow-none hover:border-box-stroke hover:border-2 hover:cursor-pointer">
        <h3 className="text-my-orange font-bold">Chapter 1</h3>
        <h2 className="text-xl font-bold">Sraddhatraya Vibhaga Yoga</h2>
        <p className="text-gray-500 mt-2">
          Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus.
          Voluptas iusto libero adipisci rem et corporis.
        </p>

        <div className="flex justify-between">
          <div className="flex text-sm items-center mt-4">
            <img src="/list.svg" className="h-5 w-5 mr-4" />
            42 Verses
          </div>

          <div className="flex mt-4">
            <div className="flex text-sm items-center align-middle mr-3">
              <img src="/bookmark.svg" className="h-4  w-4 mr-1" />2
            </div>

            <div className="flex text-sm items-center">
              <img src="/shuffle.svg" className="h-5 w-5 mr-1" />2
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VerseCard;
