import NoteCard from "./NoteCard.jsx";

export default function NotesGrid({ notes }) {
  if (!notes.length) {
    return <p className="empty">No notes yet. Add your first one 👇</p>;
  }
  return (
    <section className="grid">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} />
      ))}
    </section>
  );
}
