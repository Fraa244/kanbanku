import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import BrandMark from "../components/BrandMark";
import { IconEye, IconEyeOff } from "../components/icons/Icons";

export default function Login() {
  const { user, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/board" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!usernameOrEmail.trim() || !password) {
      setError("Semua kolom wajib diisi");
      return;
    }
    setSubmitting(true);
    try {
      await login({ usernameOrEmail: usernameOrEmail.trim(), password });
      showToast("Berhasil masuk", "success");
      navigate("/board");
    } catch (err) {
      setError(err.message || "Gagal masuk");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <BrandMark size={30} />
          <span>KanbanKu</span>
        </div>
        <h1>Selamat Datang Kembali</h1>
        <p className="auth-subtitle">Masuk untuk melanjutkan mengelola tugasmu</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-field">
            <span>Username atau Email</span>
            <input
              value={usernameOrEmail}
              onChange={(event) => setUsernameOrEmail(event.target.value)}
              placeholder="johndoe"
              autoFocus
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <p className="auth-footer">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}
