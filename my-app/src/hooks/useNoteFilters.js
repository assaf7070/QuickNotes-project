import { useMemo, useState } from "react";

export function getFilteredNotes(notes, query, selectedCats) {
  const q = query.trim().toLowerCase();
  return notes.filter((n) => {
    const matchesQuery =
      !q || n.title?.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
    const matchesCat = selectedCats.length === 0 || selectedCats.includes(n.category);
    return matchesQuery && matchesCat;
  });
}

// Hook that owns filter state + derived list
export function useNoteFilters(notes, { initialQuery = "", initialCats = [] } = {}) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCats, setSelectedCats] = useState(initialCats);

  const filteredNotes = useMemo(
    () => getFilteredNotes(notes, query, selectedCats),
    [notes, query, selectedCats]
  );

  const clearFilters = () => {
    setQuery("");
    setSelectedCats([]);
  };

  const hasActiveFilters = query.trim() !== "" || selectedCats.length > 0;

  return {
    query,
    setQuery,
    selectedCats,
    setSelectedCats,
    filteredNotes,
    clearFilters,
    hasActiveFilters,
  };
}
