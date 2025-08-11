import { useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NotesGrid from "./components/NotesGrid.jsx";
import NoteModal from "./components/NoteModal.jsx";
import { useNotes } from "./hooks/useNotes.js";

export default function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState(null);

  const openNote = (note) => setActiveNote(note);
  const closeNote = () => setActiveNote(null);

  // Close the modal if the currently open note is deleted
  const handleDelete = (id) => {
    deleteNote(id);
    setActiveNote((prev) => (prev && prev.id === id ? null : prev));
  };

  return (
    <main className="container">
      <h1>QuickNotes</h1>

      {/* Add mode */}
      <NoteForm onSubmit={addNote} submitLabel="Add" />

      <NotesGrid notes={notes} onDelete={handleDelete} onOpen={openNote} />

      {/* Edit mode in modal */}
      <NoteModal
        note={activeNote}
        isOpen={!!activeNote}
        onRequestClose={closeNote}
        onUpdate={updateNote}
      />
    </main>
  );
}
