import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useBoard } from "../context/BoardContext";
import { useToast } from "../context/ToastContext";
import BrandMark from "./BrandMark";
import { IconDownload, IconLogout, IconMoon, IconSun, IconUpload } from "./icons/Icons";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { exportBoard, importBoard } = useBoard();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        importBoard(data);
        showToast("Data berhasil diimpor", "success");
      } catch (error) {
        showToast("Gagal mengimpor file", "error");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  const initials = (user?.displayName || user?.username || "?").slice(0, 2).toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <BrandMark size={26} />
        <span>KanbanKu</span>
      </div>
      <div className="navbar-actions">
        <button type="button" className="icon-btn" onClick={exportBoard} title="Ekspor data">
          <IconDownload size={18} />
        </button>
        <button type="button" className="icon-btn" onClick={handleImportClick} title="Impor data">
          <IconUpload size={18} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          hidden
          onChange={handleFileChange}
        />
        <button type="button" className="icon-btn" onClick={toggleTheme} title="Ganti tema">
          {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
        </button>
        <div className="navbar-user">
          <span className="user-avatar">{initials}</span>
          <span className="user-name">{user?.displayName || user?.username}</span>
        </div>
        <button type="button" className="icon-btn" onClick={logout} title="Keluar">
          <IconLogout size={18} />
        </button>
      </div>
    </nav>
  );
}
