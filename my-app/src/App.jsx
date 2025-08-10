import { useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NotesGrid from "./components/NotesGrid.jsx";

export default function App() {
  const [notes, setNotes] = useState([]);

  const addNote = ({ title, body }) => {
    const b = body.trim();
    const t = title?.trim();
    if (!b) return;

    const newNote = {
      id: crypto.randomUUID(),
      title: t || null, 
      body: b,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <main className="container">
      <h1>QuickNotes</h1>
      <NoteForm onAdd={addNote} />
      <NotesGrid notes={notes} onDelete={deleteNote} />
    </main>
  );
}
