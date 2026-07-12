import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { isValidEmail, isValidUsername } from "../utils/validation";
import BrandMark from "../components/BrandMark";
import { IconEye, IconEyeOff } from "../components/icons/Icons";

export default function Register() {
  const { user, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/board" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!username.trim() || !email.trim() || !password) {
      setError("Semua kolom wajib diisi");
      return;
    }
    if (!isValidUsername(username)) {
      setError("Username 3-20 karakter, hanya huruf, angka, underscore");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Format email tidak valid");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }
    setSubmitting(true);
    try {
      await register({
        username: username.trim(),
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      });
      showToast("Akun berhasil dibuat", "success");
      navigate("/board");
    } catch (err) {
      setError(err.message || "Gagal mendaftar");
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
        <h1>Buat Akun Baru</h1>
        <p className="auth-subtitle">Mulai kelola tugasmu dengan lebih rapi</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="form-field">
            <span>Nama Tampilan</span>
            <input
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="John Doe (opsional)"
              autoFocus
            />
          </label>
          <label className="form-field">
            <span>Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="johndoe"
            />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="john@email.com"
            />
          </label>
          <label className="form-field">
            <span>Password</span>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimal 6 karakter"
              />
              <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              </button>
            </div>
          </label>
          <label className="form-field">
            <span>Konfirmasi Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Ulangi password"
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <p className="auth-footer">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}
