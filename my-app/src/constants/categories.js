export const CATEGORIES = [
  { value: "personal", label: "Personal", color: "#f6f7fb" },
  { value: "work",     label: "Work",     color: "blue" },
  { value: "ideas",    label: "Ideas",    color: "violet" },
  { value: "study",    label: "Study",    color: "teal" },
];

export const DEFAULT_CATEGORY = "personal";

export const getCategory = (value) =>
  CATEGORIES.find((c) => c.value === value) || null;

export const getCategoryColor = (value) =>
  (getCategory(value)?.color) || "#f6f7fb";
