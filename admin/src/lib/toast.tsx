import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

type Toast = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastEventDetail = {
  type?: ToastType;
  message: string;
};

declare global {
  interface WindowEventMap {
    'admin-toast': CustomEvent<ToastEventDetail>;
  }
}

const TOAST_EVENT = 'admin-toast';
let toastId = 0;

export const extractErrorMessage = (error: unknown, fallback = 'An error occurred') => {
  const err = error as any;
  const responseMessage = err?.response?.data?.message;
  const responseError = err?.response?.data?.error;

  if (typeof responseMessage === 'string' && responseMessage.trim()) {
    return responseMessage;
  }

  if (typeof responseError === 'string' && responseError.trim()) {
    return responseError;
  }

  if (err?.message && typeof err.message === 'string') {
    return err.message;
  }

  return fallback;
};

export const showToast = (message: string, type: ToastType = 'info') => {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<ToastEventDetail>(TOAST_EVENT, {
      detail: { type, message },
    })
  );
};

export const showSuccessToast = (message: string) => showToast(message, 'success');
export const showErrorToast = (message: string) => showToast(message, 'error');

export function ToastViewport() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const onToast = (event: WindowEventMap['admin-toast']) => {
      const message = event.detail.message?.trim();
      if (!message) return;

      const id = ++toastId;
      setToasts((current) => [
        ...current,
        { id, type: event.detail.type || 'info', message },
      ]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 4500);
    };

    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 3000,
        display: 'grid',
        gap: 10,
        width: 'min(420px, calc(100vw - 32px))',
      }}
    >
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            role={isError ? 'alert' : 'status'}
            style={{
              padding: '12px 14px',
              borderRadius: 8,
              color: isError ? '#7f1d1d' : isSuccess ? '#065f46' : '#1f2937',
              background: isError ? '#fee2e2' : isSuccess ? '#ecfdf5' : '#f3f4f6',
              border: `1px solid ${isError ? '#ef4444' : isSuccess ? '#10b981' : '#d1d5db'}`,
              boxShadow: '0 10px 24px rgba(15, 23, 42, 0.16)',
              fontSize: 14,
              lineHeight: 1.45,
              wordBreak: 'break-word',
            }}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}
