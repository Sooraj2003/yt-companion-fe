import { useEffect, useState } from "react";
import api from "../api";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const fetchNotes = () => {
    api.get("/notes").then((res) => setNotes(res.data));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = () => {
    api.post("/notes", { content }).then(() => {
      setContent("");
      fetchNotes();
    });
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="font-bold text-lg mb-2">Notes</h3>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border p-2 w-full mb-2" placeholder="Write your idea..." />
      <button onClick={addNote} className="bg-green-500 text-white px-4 py-2">Add Note</button>
      <ul className="mt-4">
        {notes.map((note) => (
          <li key={note._id} className="border-b py-2">{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;