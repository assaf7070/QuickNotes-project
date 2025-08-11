import { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { CATEGORIES, DEFAULT_CATEGORY } from "../constants/categories.js";

export default function NoteForm({
  onSubmit,
  initialTitle = "",
  initialBody = "",
  initialCategory = DEFAULT_CATEGORY,
  submitLabel = "Add",
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [category, setCategory] = useState(initialCategory);

  // Sync when props change (used in edit mode too)
  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
    setCategory(initialCategory);
  }, [initialTitle, initialBody, initialCategory]);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ title, body, category });
    if (submitLabel === "Add") {
      setTitle("");
      setBody("");
      setCategory(DEFAULT_CATEGORY);
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

      {/* Category selector */}
      <Select
        data={CATEGORIES.map(({ value, label }) => ({ value, label }))}
        value={category}
        onChange={(v) => setCategory(v)}
        label="Category"
        allowDeselect={false}
        comboboxProps={{ withinPortal: true }}
      />

      <button className="btn" type="submit" disabled={!canSubmit}>
        {submitLabel}
      </button>
    </form>
  );
}
