import React from "react";
import Notescard from "../components/Shared/NotesCard";
import PagesLayout from "../layouts/PagesLayout";

const Notes = () => {
  return (
    <div className="bg-gray-400">
      <div className="w-full md:w-1/2 p-12 bg-white">
        <Notescard />
        <Notescard />
        <Notescard />
        <Notescard />
        <Notescard />
        <Notescard />
      </div>
    </div>
  );
};

export default Notes;

Notes.getLayout = function getLayout(page) {
  return <PagesLayout>{page}</PagesLayout>;
};
