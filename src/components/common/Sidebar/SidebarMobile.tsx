import { X } from "lucide-react";
import logo from '@/assets/brand/logo.svg'
import SidebarBody from "./SidebarBody/SidebarBody";
const SidebarMobile = ({ handleOpen }: { handleOpen: (state: boolean) => void }) => {
  return (
    <div className="absolute flex lg:hidden z-20 w-screen bg-black/50 top-0 left-0">
      <section className="flex flex-col w-72 rounded-xl bg-slate-800 min-h-screen">
        <header className="w-full flex flex-col">
          <X className="text-white cursor-pointer self-end m-6" onClick={() => handleOpen(false)} />
          <img src={logo} className="mx-6"/>
        </header>
        <SidebarBody />
      </section>
    </div>
  );
}

export default SidebarMobile;