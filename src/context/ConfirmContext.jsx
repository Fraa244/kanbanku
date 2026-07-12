import { createContext, useCallback, useContext, useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [dialog, setDialog] = useState(null);

  const confirmAction = useCallback((options) => {
    return new Promise((resolve) => {
      setDialog({
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        onConfirm: () => {
          setDialog(null);
          resolve(true);
        },
        onCancel: () => {
          setDialog(null);
          resolve(false);
        },
      });
    });
  }, []);

  return (
    <ConfirmContext.Provider value={confirmAction}>
      {children}
      {dialog && <ConfirmDialog {...dialog} />}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  return useContext(ConfirmContext);
}
