import { useState } from "react";
import NoteForm from "./components/NoteForm.jsx";
import NotesGrid from "./components/NotesGrid.jsx";
import NoteModal from "./components/NoteModal.jsx";
import FiltersBar from "./components/FiltersBar.jsx";
import { useNoteFilters } from "./hooks/useNoteFilters.js";
import { useNotes } from "./hooks/useNotes.js";

export default function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState(null);

  const {
    query,
    setQuery,
    selectedCats,
    setSelectedCats,
    filteredNotes,
    clearFilters,
    hasActiveFilters,
  } = useNoteFilters(notes);

  const openNote = (note) => setActiveNote(note);
  const closeNote = () => setActiveNote(null);

  const handleDelete = (id) => {
    deleteNote(id);
    setActiveNote((prev) => (prev && prev.id === id ? null : prev));
  };

  return (
    <main className="container">
      <h1>QuickNotes</h1>

      <NoteForm onSubmit={addNote} submitLabel="Add" />

      <FiltersBar
        query={query}
        onQueryChange={setQuery}
        selectedCategories={selectedCats}
        onSelectedCategoriesChange={setSelectedCats}
        onClear={clearFilters}
        hasActive={hasActiveFilters}
      />

      <NotesGrid
        notes={filteredNotes}
        onDelete={handleDelete}
        onOpen={openNote}
        emptyText={
          notes.length === 0
            ? "No notes yet. Add your first one 👇"
            : "No notes match your filters."
        }
      />

      <NoteModal
        note={activeNote}
        isOpen={!!activeNote}
        onRequestClose={closeNote}
        onUpdate={updateNote}
      />
    </main>
  );
}
