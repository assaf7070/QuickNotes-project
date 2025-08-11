import { Group, TextInput, Chip, Button } from "@mantine/core";
import { CATEGORIES } from "../constants/categories.js";

export default function FiltersBar({
  query,
  onQueryChange,
  selectedCategories,      // array of category values
  onSelectedCategoriesChange,
}) {
  const hasActiveFilters = query.trim() !== "" || selectedCategories.length > 0;

  return (
    <Group justify="space-between" mb="md" wrap="wrap" gap="sm">
      {/* Search by title or body */}
      <TextInput
        placeholder="Search notes…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        style={{ minWidth: 240, flex: "1 1 280px" }}
      />

      {/* Category filter buttons (multi-select) */}
      <Group gap="xs">
        <Chip.Group
          multiple
          value={selectedCategories}
          onChange={onSelectedCategoriesChange}
        >
          {CATEGORIES.map(({ value, label }) => (
            <Chip key={value} value={value}>
              {label}
            </Chip>
          ))}
        </Chip.Group>

        {hasActiveFilters && (
          <Button
            variant="subtle"
            onClick={() => {
              onQueryChange("");
              onSelectedCategoriesChange([]);
            }}
          >
            Clear
          </Button>
        )}
      </Group>
    </Group>
  );
}
