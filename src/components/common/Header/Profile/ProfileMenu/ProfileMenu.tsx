import { useAuth } from "@/providers/AuthProvider";
import { Repeat, Settings, User } from "lucide-react";
import { DEMO_ACCOUNTS } from "@/environments/demo";
import { Link } from "react-router-dom";

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white";

const ProfileMenu = () => {
  const { demoProfile, switchProfile } = useAuth();
  const other = demoProfile === "admin" ? "user" : "admin";

  return (
    <div className="glass-strong absolute right-0 top-[calc(100%+0.75rem)] z-30 w-56 animate-fade-in select-none p-1.5">
      <ul className="flex flex-col">
        <Link to={"/profile"}>
          <li className={itemClass}>
            <User size={18} />
            Meu perfil
          </li>
        </Link>
        <Link to={"/configs"}>
          <li className={itemClass}>
            <Settings size={18} />
            Configurações
          </li>
        </Link>

        <div className="my-1 h-px w-full bg-white/10"></div>
        <li className={itemClass} onClick={() => switchProfile(other)}>
          <Repeat size={18} />
          Entrar como {DEMO_ACCOUNTS[other].label.toLowerCase()}
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
