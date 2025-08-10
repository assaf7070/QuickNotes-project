import { format } from "date-fns";

export default function NoteCard({ note, onDelete }) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      onDelete(note.id);
    }
  };

  const created = format(note.createdAt, "MMM do h:mm a"); // e.g. "Sep 1st 10:06 AM"

  return (
    <article className="card">
      <div className="top-row">
        <div className="meta">{created}</div>
        <button className="icon-btn" aria-label="Delete" onClick={handleDelete}>
          ×
        </button>
      </div>
      {note.title && <h3 className="title">{note.title}</h3>}
      <p className="body">{note.body}</p>
    </article>
  );
}
