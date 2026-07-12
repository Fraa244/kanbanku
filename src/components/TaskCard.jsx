import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeadlineBadge, PriorityBadge, TagBadge } from "./Badges";
import { IconChecklist, IconTrash } from "./icons/Icons";

export default function TaskCard({ task, tags, onOpen, onDelete, isDone }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const taskTags = tags.filter((tag) => (task.tagIds || []).includes(tag.id));
  const subtasks = task.subtasks || [];
  const doneCount = subtasks.filter((subtask) => subtask.done).length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="task-card"
      {...attributes}
      {...listeners}
      onClick={() => onOpen(task)}
    >
      <div className="task-card-header">
        <PriorityBadge priority={task.priority} />
        <button
          type="button"
          className="task-delete-btn"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(task.id);
          }}
        >
          <IconTrash size={14} />
        </button>
      </div>
      <p className="task-title">{task.title}</p>
      {taskTags.length > 0 && (
        <div className="task-tags">
          {taskTags.map((tag) => (
            <TagBadge key={tag.id} tag={tag} />
          ))}
        </div>
      )}
      <div className="task-card-footer">
        <DeadlineBadge deadline={task.deadline} done={isDone} />
        {subtasks.length > 0 && (
          <span className="badge subtask-badge">
            <IconChecklist size={11} />
            {doneCount}/{subtasks.length}
          </span>
        )}
      </div>
    </div>
  );
}
