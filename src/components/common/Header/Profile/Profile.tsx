import { useData } from "@/providers/DataProvider";
import { ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import SidebarMobile from "../../Sidebar/SidebarMobile";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import ProfilePic from "../../ProfilePic/ProfilePic";
import { isAdmin } from "@/utils/isAdmin";

const Profile = () => {
  const { userData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpen = (state: boolean) => {
    setIsOpen(state);
  };
  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <section>
      <div className="flex items-center justify-between gap-5 px-4 py-3 lg:justify-end">
        <button
          type="button"
          aria-label="Abrir menu"
          className="icon-btn lg:hidden"
          onClick={() => handleOpen(true)}
        >
          <Menu />
        </button>
        {isOpen && <SidebarMobile handleOpen={handleOpen} />}
        <section className="relative">
          <button
            type="button"
            onClick={() => openMenu()}
            className="flex items-center gap-3 rounded-xl py-1 pl-3 pr-2 transition hover:bg-white/[0.06]"
          >
            <div className="flex select-none flex-col items-end">
              <p className="text-sm font-semibold text-white">
                {userData ? userData.name : "Pessoa admirável"}
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-nebula-300">
                {isAdmin(userData) ? "Administrador" : "Astromaniaco"}
              </p>
            </div>
            <ProfilePic name={userData?.name} />
            <ChevronDown
              size={16}
              className={`text-slate-400 transition ${isOpenMenu ? "rotate-180" : ""}`}
            />
          </button>
          {isOpenMenu && <ProfileMenu />}
        </section>
      </div>
    </section>
  );
};

export default Profile;
