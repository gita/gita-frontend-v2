import React from "react";
import VerseCard from "./VerseCard";

const Chapters = () => {
  return (
    <div className=" mt-14">
      <div className="max-w-7xl mx-auto z-50 px-4 sm:px-6">
        <div className="">
          <h1 className="text-5xl font-bold">Chapters</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VerseCard />
            <VerseCard />
            <VerseCard /> <VerseCard />
            <VerseCard />
            <VerseCard />

            <VerseCard />
            <VerseCard />
            <VerseCard /> <VerseCard />
            <VerseCard />
            <VerseCard />

            <VerseCard />
            <VerseCard />
            <VerseCard /> <VerseCard />
            <VerseCard />
            <VerseCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
