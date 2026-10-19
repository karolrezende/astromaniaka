import { DEMO_ACCOUNTS, DemoProfile } from "@/environments/demo";
import { useAuth } from "@/providers/AuthProvider";
import { ShieldCheck, Sparkles, User } from "lucide-react";
import { createPortal } from "react-dom";

const icons = { user: User, admin: ShieldCheck };

// Seletor flutuante para alternar entre a conta comum e a de admin da demo
const DemoSwitcher = () => {
  const { token, demoProfile, switchProfile } = useAuth();
  if (!token) return null;

  return createPortal(
    // Celular: pílula centralizada embaixo. Desktop: rodapé da barra lateral (área livre)
    <div className="glass-strong fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 py-1.5 pl-4 pr-1.5 text-xs lg:bottom-8 lg:left-8 lg:w-64 lg:translate-x-0 lg:flex-col lg:items-stretch lg:gap-2 lg:p-3">
      <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-nebula-300 lg:px-1">
        <Sparkles size={14} />
        <span className="hidden lg:inline">Modo demonstração</span>
        <span className="lg:hidden">Demo</span>
      </span>
      <div className="flex rounded-xl bg-white/[0.05] p-0.5 lg:[&>button]:flex-1 lg:[&>button]:justify-center">
        {(Object.keys(DEMO_ACCOUNTS) as DemoProfile[]).map((profile) => {
          const Icon = icons[profile];
          const active = demoProfile === profile;
          return (
            <button
              key={profile}
              type="button"
              aria-pressed={active}
              disabled={active}
              onClick={() => switchProfile(profile)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition ${
                active
                  ? "bg-gradient-accent text-white shadow-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon size={14} />
              {DEMO_ACCOUNTS[profile].label}
            </button>
          );
        })}
      </div>
    </div>,
    document.body
  );
};

export default DemoSwitcher;
