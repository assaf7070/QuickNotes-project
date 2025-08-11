import NoteCard from "./NoteCard.jsx";

export default function NotesGrid({ notes, onDelete, onOpen , emptyText}) {
  if (!notes.length) {
    return <p className="empty">{emptyText || "No notes yet. Add your first one 👇" }</p>;
  }
  return (
    <section className="grid">
      {notes.map((n) => (
        <NoteCard key={n.id} note={n} onDelete={onDelete} onOpen={onOpen}/>
      ))}
    </section>
  );
}
