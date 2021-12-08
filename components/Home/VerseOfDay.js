import React from "react";

const VerseOfDay = () => {
  return (
    <div className='max-w-7xl mx-auto z-50 px-4 sm:px-6'>
      <div className=' bg-white shadow-lg rounded-xl  mt-10 p-8 text-gray-400	'>
        <h2 className='text-my-orange font-bold mb-4 divider line one-line px-4'>
          Verse of the day - BG 1.1
        </h2>
        <p className='text-lg'>
          {" "}
          Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu
          assembled in the place of pilgrimage at Kurukṣetra, desiring to fight,
          what did they do? Dhṛtarāṣṭra said: O Sañjaya, after my sons and the
          sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra,
          desiring to fight, what did they do?{" "}
        </p>
        <button className='uppercase text-black mt-4 font-bold text-sm hover:text-gray-700'>
          See more
        </button>
      </div>
    </div>
  );
};

export default VerseOfDay;
