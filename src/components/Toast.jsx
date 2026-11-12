import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} style={{ color: 'var(--success)' }} />}
          {toast.type === 'error' && <AlertCircle size={18} style={{ color: 'var(--danger)' }} />}
          {toast.type === 'info' && <Info size={18} style={{ color: 'var(--accent-primary)' }} />}

          <span>{toast.message}</span>

          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
