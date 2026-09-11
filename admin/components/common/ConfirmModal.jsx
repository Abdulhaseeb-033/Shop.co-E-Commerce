"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="text-center py-2 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto">
          <AlertTriangle size={24} />
        </div>

        <p className="text-xs sm:text-sm text-gray-500 px-2 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Trash2 size={14} />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
