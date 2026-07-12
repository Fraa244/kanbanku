import { PRIORITY_LEVELS } from "../utils/constants";
import { IconSearch, IconX } from "./icons/Icons";

export default function FilterBar({ filters, setFilters, tags }) {
  function togglePriority(id) {
    setFilters((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(id)
        ? prev.priorities.filter((priority) => priority !== id)
        : [...prev.priorities, id],
    }));
  }

  function toggleTag(id) {
    setFilters((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(id)
        ? prev.tagIds.filter((tagId) => tagId !== id)
        : [...prev.tagIds, id],
    }));
  }

  function toggleOverdue() {
    setFilters((prev) => ({ ...prev, onlyOverdue: !prev.onlyOverdue }));
  }

  function clearFilters() {
    setFilters({ search: "", priorities: [], tagIds: [], onlyOverdue: false });
  }

  const hasActiveFilters =
    filters.search || filters.priorities.length > 0 || filters.tagIds.length > 0 || filters.onlyOverdue;

  return (
    <div className="filter-bar">
      <div className="filter-search">
        <IconSearch size={16} />
        <input
          placeholder="Cari tugas..."
          value={filters.search}
          onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
        />
      </div>
      <div className="filter-chips">
        {PRIORITY_LEVELS.map((level) => (
          <button
            key={level.id}
            type="button"
            className={"filter-chip" + (filters.priorities.includes(level.id) ? " filter-chip-active" : "")}
            style={{ "--chip-color": level.color }}
            onClick={() => togglePriority(level.id)}
          >
            {level.label}
          </button>
        ))}
        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            className={"filter-chip" + (filters.tagIds.includes(tag.id) ? " filter-chip-active" : "")}
            style={{ "--chip-color": tag.color }}
            onClick={() => toggleTag(tag.id)}
          >
            {tag.name}
          </button>
        ))}
        <button
          type="button"
          className={"filter-chip" + (filters.onlyOverdue ? " filter-chip-active" : "")}
          onClick={toggleOverdue}
        >
          Terlambat
        </button>
        {hasActiveFilters && (
          <button type="button" className="filter-clear" onClick={clearFilters}>
            <IconX size={12} /> Bersihkan
          </button>
        )}
      </div>
    </div>
  );
}
