import React from "react";

const VerseCard = () => {
  return (
    <div className="bg-white shadow-xl  border-2 border-white mt-6 rounded-md p-6 hover:bg-yellow-100 hover:shadow-none hover:border-yellow-500 hover:border-2 ">
      <h3 className="text-my-orange font-bold">Chapter 1</h3>
      <h2 className="text-xl font-bold">Sraddhatraya Vibhaga Yoga</h2>
      <p className="text-gray-500 mt-2">
        Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus.
        Voluptas iusto libero adipisci rem et corporis.
      </p>

      <div className="flex justify-between">
        <div className="flex text-sm align-middle mt-4">
          <img src="/list.png" className="h-5 w-5 mr-4" />
          42 Verses
        </div>

        <div className="flex mt-4">
          <div className="flex text-sm">
          <img src="/bookmark.png" className="h-5 w-5 mr-1" />

            2
          </div>

          <div className="flex text-sm">
          <img src="/shuffle.png" className="h-5 w-5 mr-1" />

            2
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseCard;
