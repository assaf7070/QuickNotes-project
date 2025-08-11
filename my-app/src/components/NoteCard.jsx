import { format } from "date-fns";
import { getCategoryColor } from "../constants/categories.js";

export default function NoteCard({ note, onDelete, onOpen }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this note?")) onDelete(note.id);
  };

  const created = format(note.createdAt, "MMM do h:mm a");
  const updated = note.updatedAt ? format(note.updatedAt, "MMM do h:mm a") : null;

  // Mantine color token (very light background + stronger border)
  const color = getCategoryColor(note.category);
  const style = {
    background: `var(--mantine-color-${color}-0)`,
    borderColor: `var(--mantine-color-${color}-5)`,
  };

  return (
    <article
      className="card clickable"
      style={style}
      onClick={() => onOpen(note)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(note)}
    >
      <div className="top-row">
        <span />
        <button className="icon-btn" aria-label="Delete" onClick={handleDelete}>
          ×
        </button>
      </div>

      {note.title && <h3 className="title">{note.title}</h3>}
      <p className="body">{note.body}</p>

      <div className="meta-row">
        <div className="meta">Created: {created}</div>
        {updated && <div className="meta">Updated: {updated}</div>}
      </div>
    </article>
  );
}
