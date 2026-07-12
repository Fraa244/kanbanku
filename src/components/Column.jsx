import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useConfirm } from "../context/ConfirmContext";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPencil,
  IconPlus,
  IconTrash,
  IconX,
} from "./icons/Icons";

export default function Column({
  column,
  tasks,
  tags,
  isFirst,
  isLast,
  onAddTask,
  onRenameColumn,
  onDeleteColumn,
  onMoveColumn,
  onOpenTask,
  onDeleteTask,
}) {
  const { setNodeRef } = useDroppable({ id: column.id });
  const [isEditing, setIsEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(column.title);
  const confirmAction = useConfirm();

  const normalizedTitle = column.title.trim().toLowerCase();
  const isDoneColumn = normalizedTitle === "done" || normalizedTitle === "selesai";

  async function handleDelete() {
    const ok = await confirmAction({
      title: "Hapus Kolom",
      message: `Kolom "${column.title}" beserta ${tasks.length} tugas di dalamnya akan dihapus permanen.`,
      confirmText: "Hapus",
    });
    if (ok) onDeleteColumn(column.id);
  }

  function submitTitle() {
    const trimmed = titleDraft.trim();
    if (trimmed) {
      onRenameColumn(column.id, trimmed);
    } else {
      setTitleDraft(column.title);
    }
    setIsEditing(false);
  }

  function cancelEdit() {
    setTitleDraft(column.title);
    setIsEditing(false);
  }

  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-move-buttons">
          <button type="button" disabled={isFirst} onClick={() => onMoveColumn(column.id, -1)}>
            <IconChevronLeft size={14} />
          </button>
          <button type="button" disabled={isLast} onClick={() => onMoveColumn(column.id, 1)}>
            <IconChevronRight size={14} />
          </button>
        </div>
        {isEditing ? (
          <div className="column-title-edit">
            <input
              autoFocus
              value={titleDraft}
              onChange={(event) => setTitleDraft(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && submitTitle()}
            />
            <button type="button" onClick={submitTitle}>
              <IconCheck size={14} />
            </button>
            <button type="button" onClick={cancelEdit}>
              <IconX size={14} />
            </button>
          </div>
        ) : (
          <button type="button" className="column-title" onClick={() => setIsEditing(true)}>
            {column.title}
            <IconPencil size={12} />
          </button>
        )}
        <div className="column-header-actions">
          <span className="column-count">{tasks.length}</span>
          <button type="button" className="column-delete" onClick={handleDelete}>
            <IconTrash size={14} />
          </button>
        </div>
      </div>
      <div ref={setNodeRef} className="column-body">
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <p className="empty-state">Belum ada tugas</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                tags={tags}
                onOpen={onOpenTask}
                onDelete={onDeleteTask}
                isDone={isDoneColumn}
              />
            ))
          )}
        </SortableContext>
      </div>
      <button type="button" className="add-task-btn" onClick={() => onAddTask(column.id)}>
        <IconPlus size={14} /> Tambah Tugas
      </button>
    </div>
  );
}
