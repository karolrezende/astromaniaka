import { X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

const ModalPostLayout = ({
  children,
  handleModalPost,
}: {
  children: React.ReactNode;
  handleModalPost: () => void;
}) => {
  // Portal: evita que o backdrop-blur dos cards "prenda" o position: fixed
  return createPortal(
    <nav
      className="fixed left-0 top-0 z-30 flex min-h-screen w-full items-center justify-center bg-space-950/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleModalPost()}
    >
      <div className="glass-strong mx-4 max-h-[90vh] w-full max-w-lg animate-fade-in overflow-y-auto text-slate-200">
        <div className="relative flex flex-col p-6">
          <button
            type="button"
            aria-label="Fechar"
            onClick={handleModalPost}
            className="icon-btn absolute right-3 top-3"
          >
            <X size={18} />
          </button>
          {children}
        </div>
      </div>
    </nav>,
    document.body
  );
};

export default ModalPostLayout;
