import { getPriority } from "../utils/constants";
import { formatDate, isDueSoon, isOverdue } from "../utils/date";
import { IconCalendar, IconFlag, IconWarning, IconX } from "./icons/Icons";

export function PriorityBadge({ priority }) {
  const info = getPriority(priority);
  return (
    <span className="badge priority-badge" style={{ "--badge-color": info.color }}>
      <IconFlag size={11} />
      {info.label}
    </span>
  );
}

export function TagBadge({ tag, onRemove }) {
  return (
    <span className="badge tag-badge" style={{ "--badge-color": tag.color }}>
      {tag.name}
      {onRemove && (
        <button type="button" className="tag-remove" onClick={() => onRemove(tag.id)}>
          <IconX size={10} />
        </button>
      )}
    </span>
  );
}

export function DeadlineBadge({ deadline, done }) {
  if (!deadline) return null;
  const overdue = !done && isOverdue(deadline);
  const soon = !done && !overdue && isDueSoon(deadline);
  const className =
    "badge deadline-badge" +
    (overdue ? " deadline-overdue" : soon ? " deadline-soon" : "");
  return (
    <span className={className}>
      {overdue ? <IconWarning size={11} /> : <IconCalendar size={11} />}
      {formatDate(deadline)}
    </span>
  );
}
