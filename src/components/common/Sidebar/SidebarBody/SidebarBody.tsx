import { useData } from "@/providers/DataProvider";
import { isAdmin } from "@/utils/isAdmin";
import {
  BookOpen,
  Home,
  LucideIcon,
  ShieldCheck,
  Telescope,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const links: { to: string; label: string; Icon: LucideIcon }[] = [
  { to: "/", label: "Início", Icon: Home },
  { to: "/history", label: "Astronomia e história", Icon: BookOpen },
  { to: "/people", label: "Rede", Icon: Users },
  { to: "/astronomers", label: "Astrônomos", Icon: Telescope },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `group flex select-none items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
    isActive
      ? "bg-gradient-to-r from-nebula-500/25 to-stardust-500/10 text-white shadow-[inset_2px_0_0_0_#A78BFA]"
      : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
  }`;

const SidebarBody = () => {
  const { userData } = useData();
  return (
    <nav className="flex-1 px-3 py-6">
      <p className="mb-3 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Explorar
      </p>
      <ul className="flex flex-col gap-1">
        {links.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to} end className={linkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      {isAdmin(userData) && (
        <>
          <p className="mb-3 mt-8 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Gestão
          </p>
          <ul>
            <li>
              <NavLink to={"/admin"} className={linkClass}>
                <ShieldCheck size={18} />
                Painel administrativo
              </NavLink>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default SidebarBody;
