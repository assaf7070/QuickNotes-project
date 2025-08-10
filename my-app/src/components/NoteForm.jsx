import { useState } from "react";

export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd({ title, body });
    setTitle("");
    setBody("");
  };

  const canSubmit = body.trim().length > 0;

  return (
    <form className="note-form" onSubmit={submit}>
      <input
        className="title-input"
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="note-input"
        rows={5}
        placeholder="Write a note..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button className="btn" type="submit" disabled={!canSubmit}>
        Add
      </button>
    </form>
  );
}
