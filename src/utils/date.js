export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(`${isoString}T00:00:00`);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function isOverdue(isoString) {
  if (!isoString) return false;
  const deadline = new Date(`${isoString}T00:00:00`);
  return deadline < startOfToday();
}

export function isDueSoon(isoString) {
  if (!isoString) return false;
  const deadline = new Date(`${isoString}T00:00:00`);
  const today = startOfToday();
  const diffDays = Math.round((deadline - today) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 2;
}
