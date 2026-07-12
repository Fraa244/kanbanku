export default function ConfirmDialog({ title, message, confirmText, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-panel confirm-dialog" onClick={(event) => event.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <div className="modal-actions-right">
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Batal
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              {confirmText || "Konfirmasi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
