"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg border text-sm max-w-sm transition-all animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-900 text-emerald-50 border-emerald-800"
              : toast.type === "error"
              ? "bg-red-900 text-red-50 border-red-800"
              : "bg-slate-900 text-slate-50 border-slate-800"
          }`}
        >
          {toast.type === "success" && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          {toast.type === "error" && (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          {toast.type === "info" && (
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
          )}

          <p className="flex-1 font-medium text-xs leading-relaxed">
            {toast.message}
          </p>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
