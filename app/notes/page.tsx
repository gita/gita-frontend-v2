"use client";

import React, { useState } from "react";
// import { supabase } from "../../utils/supabase";
import Notescard from "../../components/Shared/NotesCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  // useEffect(async () => {
  //   const { data } = await supabase.auth.getSession();
  //   if (data.session === null) {
  //     router.push("/login");
  //     dispatch(
  //       setNotification({
  //         status: "failed",
  //         message: "Please Login to Save Notes",
  //       })
  //     );
  //   } else {
  //     supabase
  //       .from("Notes")
  //       .select("*")
  //       .eq("user_id", data.session.user?.id)
  //       .then(({ data, error }) => {
  //         if (!error) {
  //           setNotes(data);
  //         }
  //       });
  //   }
  // }, [supabase]);
  return (
    <div className="bg-gray-400">
      <div className="w-full md:w-1/2 p-12 bg-white">
        {notes.map((note, index) => (
          <Notescard note={note} key={index}></Notescard>
        ))}
      </div>
    </div>
  );
};
export default Notes;
