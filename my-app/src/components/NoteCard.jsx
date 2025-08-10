export default function NoteCard({ note }) {
  const created = new Date(note.createdAt).toLocaleString(); 
  return (
    <article className="card">
      <div className="meta">{created}</div>
      <p className="body">{note.body}</p>
    </article>
  );
}
