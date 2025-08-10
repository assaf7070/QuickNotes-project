import { useState } from "react";

export default function NoteForm({ onAdd }) {
  const [body, setBody] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd(body);
    setBody("");
  };

  const canSubmit = body.trim().length > 0;

  return (
    <form className="note-form" onSubmit={submit}>
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
