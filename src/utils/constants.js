export const PRIORITY_LEVELS = [
  { id: "low", label: "Rendah", color: "#3FA45D" },
  { id: "medium", label: "Sedang", color: "#E8A33D" },
  { id: "high", label: "Tinggi", color: "#E8703D" },
  { id: "urgent", label: "Mendesak", color: "#D63A3A" },
];

export const TAG_COLOR_PALETTE = [
  "#D63A3A",
  "#E8703D",
  "#E8A33D",
  "#3FA45D",
  "#14958F",
  "#2E6FD9",
  "#7B5FE0",
  "#C24FA0",
  "#57606F",
];

export function getPriority(id) {
  return PRIORITY_LEVELS.find((level) => level.id === id) || PRIORITY_LEVELS[1];
}

export function randomTagColor() {
  return TAG_COLOR_PALETTE[Math.floor(Math.random() * TAG_COLOR_PALETTE.length)];
}
