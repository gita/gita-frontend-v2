"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { supabase } from "../../utils/supabase";
import Notescard from "../../components/Shared/NotesCard";
import { setNotification } from "../../redux/actions/main";

const Notes = () => {
  const [notes, setNotes] = useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session === null) {
        router.push("/login");
        dispatch(
          setNotification({
            status: "failed",
            message: "Please Login to Save Notes",
          })
        );
      } else {
        supabase
          .from("Notes")
          .select("*")
          .eq("user_id", data.session.user?.id)
          .then(({ data, error }) => {
            if (!error) {
              setNotes(data);
            }
          });
      }
    };

    fetchData();
  }, [dispatch, router]);

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
