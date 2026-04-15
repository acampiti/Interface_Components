import type { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function Modal({ open, onClose, title, children, actions }: ModalProps) {
  if (!open) return null;

  return (
    <div className="modal-box">
      <div className="modal-header">
        <span className="modal-title">{title}</span>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &#x2715;
        </button>
      </div>
      <div className="modal-body">{children}</div>
      {actions && <div className="modal-footer">{actions}</div>}
    </div>
  );
}
