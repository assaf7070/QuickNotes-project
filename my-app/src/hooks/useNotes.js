import { useEffect, useState } from "react";
import { DEFAULT_CATEGORY } from "../constants/categories.js";


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
            category:
                typeof n.category === "string" && n.category ? n.category : DEFAULT_CATEGORY,
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

    const addNote = ({ title, body, category }) => {
        const b = body.trim();
        const t = title?.trim();
        if (!b) return;
        setNotes((prev) => [
            { id: crypto.randomUUID(), title: t || null, body: b, createdAt: Date.now(), category: category || DEFAULT_CATEGORY, },
            ...prev,
        ]);
    };

    const updateNote = (id, { title, body, category }) => {
        const b = body.trim();
        const t = title?.trim();
        if (!b) return;
        const now = Date.now();
        setNotes((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, title: t || null, body: b, category: category || n.category, updatedAt: now } : n
            )
        );
    };

    const deleteNote = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    return { notes, addNote, updateNote, deleteNote };
}
