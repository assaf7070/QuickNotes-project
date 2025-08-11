import { useEffect, useState } from "react";

const STORAGE_KEY = "quicknotes.notes.v1";

function normalizeStoredNotes(value) {
  const arr = Array.isArray(value) ? value : [];
  return arr
    .filter(
      (n) =>
        n &&
        typeof n.id === "string" &&
        typeof n.body === "string" &&
        Number.isFinite(n.createdAt)
    )
    .map((n) => ({
      id: n.id,
      title:
        typeof n.title === "string" && n.title.trim() ? n.title.trim() : null,
      body: n.body,
      createdAt: n.createdAt,
      updatedAt: Number.isFinite(n.updatedAt) ? n.updatedAt : undefined,
    }));
}

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return normalizeStoredNotes(JSON.parse(raw));
  } catch (err) {
    console.warn("Failed to load notes from localStorage:", err);
    return [];
  }
}

function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (err) {
    console.warn("Failed to save notes to localStorage:", err);
  }
}

export function useNotes() {
  const [notes, setNotes] = useState(loadNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = ({ title, body }) => {
    const b = body.trim();
    const t = title?.trim();
    if (!b) return;
    setNotes((prev) => [
      { id: crypto.randomUUID(), title: t || null, body: b, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const updateNote = (id, { title, body }) => {
    const b = body.trim();
    const t = title?.trim();
    if (!b) return;
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, title: t || null, body: b, updatedAt: now } : n
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
}
