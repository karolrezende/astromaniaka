import { X } from "lucide-react";

const SidebarMobile = ({handleOpen}: {handleOpen: (state:boolean)=>void}) => {
    return (
        <div className="absolute z-20 w-screen bg-black/50 top-0 left-0">
          <section className="flex w-72 rounded-xl bg-slate-800 min-h-screen">
            <header className="w-full flex justify-end p-6">
              <X className="text-white cursor-pointer" onClick={()=>handleOpen(false)} />
            </header>
          </section>
        </div>
      );
}
 
export default SidebarMobile;