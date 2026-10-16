import { X } from "lucide-react";
import logo from '@/assets/brand/logo.svg'
import SidebarBody from "./SidebarBody/SidebarBody";
import { createPortal } from "react-dom";
const SidebarMobile = ({ handleOpen }: { handleOpen: (state: boolean) => void }) => {
  return createPortal(
    <div
      className="fixed left-0 top-0 z-40 flex h-screen w-screen bg-space-950/70 backdrop-blur-sm lg:hidden"
      onClick={(e) => e.target === e.currentTarget && handleOpen(false)}
    >
      <section className="glass-strong m-3 flex w-72 animate-fade-in flex-col">
        <header className="flex w-full items-center justify-between border-b border-white/[0.06] px-5 py-5">
          <img src={logo} alt="Astromaniaka" className="w-44" />
          <button type="button" aria-label="Fechar menu" className="icon-btn" onClick={() => handleOpen(false)}>
            <X size={18} />
          </button>
        </header>
        <SidebarBody />
      </section>
    </div>,
    document.body
  );
}

export default SidebarMobile;
