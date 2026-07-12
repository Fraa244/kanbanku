import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { getBoard, saveBoard } from "../utils/storage";
import { generateId } from "../utils/id";

const BoardContext = createContext(null);

const DEFAULT_FILTERS = { search: "", priorities: [], tagIds: [], onlyOverdue: false };

function createDefaultBoard() {
  return {
    columns: [
      { id: generateId(), title: "Todo", order: 0 },
      { id: generateId(), title: "Doing", order: 1 },
      { id: generateId(), title: "Done", order: 2 },
    ],
    tasks: [],
    tags: [
      { id: generateId(), name: "Bug", color: "#D63A3A" },
      { id: generateId(), name: "Fitur", color: "#2E6FD9" },
      { id: generateId(), name: "Desain", color: "#7B5FE0" },
    ],
  };
}

export function BoardProvider({ children }) {
  const { user } = useAuth();
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    const existing = getBoard(user.id);
    const board = existing || createDefaultBoard();
    setColumns(board.columns);
    setTasks(board.tasks);
    setTags(board.tags);
    setLoaded(true);
  }, [user]);

  useEffect(() => {
    if (!user || !loaded) return;
    const timeout = setTimeout(() => {
      saveBoard(user.id, { columns, tasks, tags });
    }, 300);
    return () => clearTimeout(timeout);
  }, [user, loaded, columns, tasks, tags]);

  function addColumn(title) {
    setColumns((prev) => [...prev, { id: generateId(), title, order: prev.length }]);
  }

  function renameColumn(columnId, title) {
    setColumns((prev) => prev.map((col) => (col.id === columnId ? { ...col, title } : col)));
  }

  function deleteColumn(columnId) {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
    setTasks((prev) => prev.filter((task) => task.columnId !== columnId));
  }

  function moveColumn(columnId, direction) {
    setColumns((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((col) => col.id === columnId);
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= sorted.length) return prev;
      const temp = sorted[index];
      sorted[index] = sorted[targetIndex];
      sorted[targetIndex] = temp;
      return sorted.map((col, idx) => ({ ...col, order: idx }));
    });
  }

  function addTask(columnId, data) {
    setTasks((prev) => {
      const columnTasks = prev.filter((task) => task.columnId === columnId);
      const newTask = {
        id: generateId(),
        columnId,
        title: data.title,
        description: data.description || "",
        priority: data.priority || "medium",
        deadline: data.deadline || "",
        tagIds: data.tagIds || [],
        subtasks: data.subtasks || [],
        order: columnTasks.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return [...prev, newTask];
    });
  }

  function updateTask(taskId, data) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...data, updatedAt: new Date().toISOString() } : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function moveTask(activeId, overId, columnsList, isDragOver) {
    if (!overId || activeId === overId) return;
    setTasks((prevTasks) => {
      const activeTask = prevTasks.find((task) => task.id === activeId);
      if (!activeTask) return prevTasks;

      const isOverColumn = columnsList.some((col) => col.id === overId);
      const overTask = prevTasks.find((task) => task.id === overId);
      const targetColumnId = isOverColumn
        ? overId
        : overTask
        ? overTask.columnId
        : activeTask.columnId;

      if (isDragOver) {
        if (activeTask.columnId === targetColumnId) return prevTasks;
        return prevTasks.map((task) =>
          task.id === activeId ? { ...task, columnId: targetColumnId } : task
        );
      }

      const destTasks = prevTasks
        .filter((task) => task.columnId === targetColumnId && task.id !== activeId)
        .sort((a, b) => a.order - b.order);

      let insertIndex = destTasks.length;
      if (!isOverColumn) {
        const idx = destTasks.findIndex((task) => task.id === overId);
        if (idx !== -1) insertIndex = idx;
      }

      destTasks.splice(insertIndex, 0, { ...activeTask, columnId: targetColumnId });
      const reordered = destTasks.map((task, idx) => ({ ...task, order: idx }));
      const others = prevTasks.filter((task) => task.columnId !== targetColumnId);
      return [...others, ...reordered];
    });
  }

  function addTag(name, color) {
    let created = null;
    setTags((prev) => {
      const existing = prev.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        created = existing;
        return prev;
      }
      created = { id: generateId(), name, color };
      return [...prev, created];
    });
    return created;
  }

  function deleteTag(tagId) {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
    setTasks((prev) =>
      prev.map((task) => ({ ...task, tagIds: (task.tagIds || []).filter((id) => id !== tagId) }))
    );
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = (task.description || "").toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }
      if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) {
        return false;
      }
      if (filters.tagIds.length > 0) {
        const taskTagIds = task.tagIds || [];
        const hasMatchingTag = filters.tagIds.some((id) => taskTagIds.includes(id));
        if (!hasMatchingTag) return false;
      }
      if (filters.onlyOverdue) {
        if (!task.deadline) return false;
        const deadline = new Date(`${task.deadline}T00:00:00`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (deadline >= today) return false;
      }
      return true;
    });
  }, [tasks, filters]);

  function exportBoard() {
    const data = JSON.stringify({ columns, tasks, tags }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanbanku-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function importBoard(data) {
    if (!data || !Array.isArray(data.columns) || !Array.isArray(data.tasks)) {
      throw new Error("Format file tidak valid");
    }
    setColumns(data.columns);
    setTasks(data.tasks);
    setTags(Array.isArray(data.tags) ? data.tags : []);
  }

  const value = {
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
    deleteTag,
    exportBoard,
    importBoard,
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  return useContext(BoardContext);
}
