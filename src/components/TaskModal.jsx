import { useState } from "react";
import { PRIORITY_LEVELS, randomTagColor } from "../utils/constants";
import { generateId } from "../utils/id";
import { useConfirm } from "../context/ConfirmContext";
import { IconCheck, IconPlus, IconTrash, IconX } from "./icons/Icons";

export default function TaskModal({ mode, task, tags, onAddTag, onSave, onDelete, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [deadline, setDeadline] = useState(task?.deadline || "");
  const [tagIds, setTagIds] = useState(task?.tagIds || []);
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [error, setError] = useState("");
  const confirmAction = useConfirm();

  function toggleTag(tagId) {
    setTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  }

  function handleCreateTag() {
    const trimmed = newTagName.trim();
    if (!trimmed) return;
    const tag = onAddTag(trimmed, randomTagColor());
    if (tag) {
      setTagIds((prev) => (prev.includes(tag.id) ? prev : [...prev, tag.id]));
    }
    setNewTagName("");
  }

  function handleAddSubtask() {
    const trimmed = newSubtaskText.trim();
    if (!trimmed) return;
    setSubtasks((prev) => [...prev, { id: generateId(), text: trimmed, done: false }]);
    setNewSubtaskText("");
  }

  function toggleSubtask(subtaskId) {
    setSubtasks((prev) =>
      prev.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, done: !subtask.done } : subtask
      )
    );
  }

  function removeSubtask(subtaskId) {
    setSubtasks((prev) => prev.filter((subtask) => subtask.id !== subtaskId));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Judul tugas wajib diisi");
      return;
    }
    onSave({ title: title.trim(), description, priority, deadline, tagIds, subtasks });
  }

  async function handleDeleteClick() {
    const ok = await confirmAction({
      title: "Hapus Tugas",
      message: `Tugas "${task.title}" akan dihapus permanen.`,
      confirmText: "Hapus",
    });
    if (ok) onDelete();
  }

  const doneCount = subtasks.filter((subtask) => subtask.done).length;
  const progressPercent = subtasks.length > 0 ? Math.round((doneCount / subtasks.length) * 100) : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel task-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "create" ? "Tugas Baru" : "Edit Tugas"}</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            <IconX size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="task-form">
          <label className="form-field">
            <span>Judul</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Judul tugas"
              autoFocus
            />
          </label>
          <label className="form-field">
            <span>Deskripsi</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Deskripsi opsional"
              rows={3}
            />
          </label>
          <div className="form-row">
            <label className="form-field">
              <span>Prioritas</span>
              <select value={priority} onChange={(event) => setPriority(event.target.value)}>
                {PRIORITY_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span>Tenggat Waktu</span>
              <input
                type="date"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
              />
            </label>
          </div>
          <div className="form-field">
            <span>Tag</span>
            <div className="tag-picker">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag.id}
                  className={"tag-chip" + (tagIds.includes(tag.id) ? " tag-chip-active" : "")}
                  style={{ "--chip-color": tag.color }}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            <div className="tag-create-row">
              <input
                placeholder="Buat tag baru"
                value={newTagName}
                onChange={(event) => setNewTagName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleCreateTag();
                  }
                }}
              />
              <button type="button" onClick={handleCreateTag}>
                <IconPlus size={14} />
              </button>
            </div>
          </div>
          <div className="form-field">
            <div className="subtask-header">
              <span>Checklist</span>
              {subtasks.length > 0 && (
                <span className="subtask-progress-label">
                  {doneCount}/{subtasks.length}
                </span>
              )}
            </div>
            {subtasks.length > 0 && (
              <div className="subtask-progress-bar">
                <div className="subtask-progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            )}
            <div className="subtask-list">
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="subtask-item">
                  <button
                    type="button"
                    className={"subtask-check" + (subtask.done ? " subtask-check-active" : "")}
                    onClick={() => toggleSubtask(subtask.id)}
                  >
                    {subtask.done && <IconCheck size={12} />}
                  </button>
                  <span className={subtask.done ? "subtask-text-done" : ""}>{subtask.text}</span>
                  <button type="button" className="subtask-remove" onClick={() => removeSubtask(subtask.id)}>
                    <IconX size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="subtask-create-row">
              <input
                placeholder="Tambah checklist"
                value={newSubtaskText}
                onChange={(event) => setNewSubtaskText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddSubtask();
                  }
                }}
              />
              <button type="button" onClick={handleAddSubtask}>
                <IconPlus size={14} />
              </button>
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            {mode === "edit" && (
              <button type="button" className="btn btn-danger-ghost" onClick={handleDeleteClick}>
                <IconTrash size={14} /> Hapus
              </button>
            )}
            <div className="modal-actions-right">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Batal
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
