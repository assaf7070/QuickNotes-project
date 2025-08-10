import { useEffect, useState } from "react";

export default function NoteForm({
  onSubmit, // called with { title, body }
  initialTitle = "",
  initialBody = "",
  submitLabel = "Add",
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  // Keep in sync if props change (e.g., when opening another note in the modal)
  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
    // For "Add" we reset; for "Update" we don't.
    if (submitLabel === "Add") {
      setTitle("");
      setBody("");
    }
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
        {submitLabel}
      </button>
    </form>
  );
}
