import { useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NotesGrid from "./components/NotesGrid.jsx";

export default function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (body) => {
    const trimmed = body.trim();
    if (!trimmed) return;
    const newNote = {
      id: crypto.randomUUID(),
      body: trimmed,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <main className="container">
      <h1>QuickNotes</h1>
      <NoteForm onAdd={addNote} />
      <NotesGrid notes={notes} />
    </main>
  );
}
