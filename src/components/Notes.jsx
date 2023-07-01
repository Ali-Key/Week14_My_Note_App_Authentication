/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteNotesMutation, useGetNotesQuery } from "../store/api/NoteSlice";
import { useGetUserQuery } from "../store/api/UserSlice ";

function Notes() {

  const {data: users=[]} =useGetUserQuery();
  console.log(users);

  const { data: notes = [], status, error } = useGetNotesQuery();
  const [deleteNotes] = useDeleteNotesMutation();

  const deleteNoteHandler = (id) => {
    
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNotes(id);
    }
   
  };
  

  return (
    <div className="flex flex-wrap justify-center mt-5 ">
      
      {status === "loading" && <div className="relative p-5 bg-blue-800 w-64 h-64 m-5 shadow-2xl overflow-hidden">Loading...</div>}
      {status === "failed" && <div className="relative p-5 bg-blue-800 w-64 h-64 m-5 shadow-2xl overflow-hidden">Sorry, {error}</div>}
      {notes.map((note) =>  
      
        {
          if(users.id === note.user_id)
          {
            return (
              <>
              <div
        
              className="relative bg-blue-800 w-64 h-64 m-5 shadow-2xl overflow-hidden rounded-lg "
              key={note.id}
            >
              <div className="p-5 ">
                <h3 className="font-bold text-2xl mb-4 text-white">{note.title}</h3>
                <p className="text-white">{note.content}</p>
              </div>
              <div className="absolute bg-blue-800 w-12 h-12 rotate-45 -top-6 -left-6" />
              <div className="absolute bottom-0 left-0 right-0 flex justify-center p-6 ">
              <Link to={`/edit/${note.id}`}>
                <button className="mr-10 text-green-500">
                  <FaEdit size={25} />
                </button>
                </Link>
                <button  className="text-red-600" >
                  <FaTrash size={25} onClick={() => deleteNoteHandler(note.id)} />
                </button>
              </div>
            </div>
              </>

            )
          }
          
        }
      
       
      )}
    </div>
  );
}

export default Notes;





