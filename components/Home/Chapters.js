import React from "react";
import Card from "./Card";

const Chapters = ({ chapters }) => {
  console.log(chapters);
  return (
    <div className='chapters my-14 '>
      <div className='max-w-7xl mx-auto z-50 px-4 sm:px-6'>
        <div className=''>
          <h1 className='text-5xl font-bold'>Chapters</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {chapters.map((chapter) => (
              <Card key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chapters;
