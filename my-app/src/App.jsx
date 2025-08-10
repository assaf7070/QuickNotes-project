import { useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NotesGrid from "./components/NotesGrid.jsx";
import NoteModal from "./components/NoteModal.jsx";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

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

  const updateNote = (id, { title, body }) => {
    const b = body.trim();
    const t = title?.trim();
    if (!b) return;

    const now = Date.now();

    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, title: t || null, body: b, updatedAt: now } : n
      )
    );

    // keep modal state in sync if it's open
    setActiveNote((prev) =>
      prev && prev.id === id
        ? { ...prev, title: t || null, body: b, updatedAt: now }
        : prev
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const openNote = (note) => setActiveNote(note);
  const closeNote = () => setActiveNote(null);

  return (
    <main className="container">
      <h1>QuickNotes</h1>

      <NoteForm onSubmit={addNote} submitLabel="Add" />

      <NotesGrid notes={notes} onDelete={deleteNote} onOpen={openNote} />

      <NoteModal
        note={activeNote}
        isOpen={!!activeNote}
        onRequestClose={closeNote}
        onUpdate={updateNote}
      />
    </main>
  );
}
