import { useToast } from "../context/ToastContext";
import { IconX } from "./icons/Icons";

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button type="button" onClick={() => dismissToast(toast.id)}>
            <IconX size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
