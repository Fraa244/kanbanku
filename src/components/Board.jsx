import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";
import TaskCard from "./TaskCard";
import FilterBar from "./FilterBar";
import TaskModal from "./TaskModal";
import { IconPlus } from "./icons/Icons";

export default function Board() {
  const {
    columns,
    tasks,
    tags,
    filters,
    setFilters,
    filteredTasks,
    addColumn,
    renameColumn,
    deleteColumn,
    moveColumn,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addTag,
  } = useBoard();

  const [activeTask, setActiveTask] = useState(null);
  const [modalState, setModalState] = useState(null);
  const [newColumnDraft, setNewColumnDraft] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } })
  );

  const sortedColumns = useMemo(
    () => [...columns].sort((a, b) => a.order - b.order),
    [columns]
  );

  function tasksForColumn(columnId) {
    return filteredTasks
      .filter((task) => task.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  }

  function handleDragStart(event) {
    const task = tasks.find((candidate) => candidate.id === event.active.id);
    setActiveTask(task || null);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;
    moveTask(active.id, over.id, columns, true);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;
    moveTask(active.id, over.id, columns, false);
  }

  function handleAddColumn() {
    const trimmed = newColumnName.trim();
    if (trimmed) {
      addColumn(trimmed);
      setNewColumnName("");
    }
    setNewColumnDraft(false);
  }

  return (
    <div className="board-page-content">
      <FilterBar filters={filters} setFilters={setFilters} tags={tags} />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="board-columns">
          {sortedColumns.map((column, index) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasksForColumn(column.id)}
              tags={tags}
              isFirst={index === 0}
              isLast={index === sortedColumns.length - 1}
              onAddTask={(columnId) => setModalState({ mode: "create", columnId })}
              onRenameColumn={renameColumn}
              onDeleteColumn={deleteColumn}
              onMoveColumn={moveColumn}
              onOpenTask={(task) => setModalState({ mode: "edit", task })}
              onDeleteTask={deleteTask}
            />
          ))}
          <div className="add-column-wrapper">
            {newColumnDraft ? (
              <div className="add-column-form">
                <input
                  autoFocus
                  placeholder="Nama kolom"
                  value={newColumnName}
                  onChange={(event) => setNewColumnName(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleAddColumn()}
                />
                <button type="button" onClick={handleAddColumn}>
                  Tambah
                </button>
                <button type="button" onClick={() => setNewColumnDraft(false)}>
                  Batal
                </button>
              </div>
            ) : (
              <button type="button" className="add-column-btn" onClick={() => setNewColumnDraft(true)}>
                <IconPlus size={16} /> Tambah Kolom
              </button>
            )}
          </div>
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} tags={tags} onOpen={() => {}} onDelete={() => {}} isDone={false} />
          ) : null}
        </DragOverlay>
      </DndContext>
      {modalState && (
        <TaskModal
          mode={modalState.mode}
          task={modalState.task}
          tags={tags}
          onAddTag={addTag}
          onSave={(data) => {
            if (modalState.mode === "create") {
              addTask(modalState.columnId, data);
            } else {
              updateTask(modalState.task.id, data);
            }
            setModalState(null);
          }}
          onDelete={() => {
            deleteTask(modalState.task.id);
            setModalState(null);
          }}
          onClose={() => setModalState(null)}
        />
      )}
    </div>
  );
}
