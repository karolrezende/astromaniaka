import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import {
  apiErrorMessage,
  deleteUserAsAdmin,
  getAdminUsers,
  setUserRole,
} from "@/services/admin.services";
import { adminUserType } from "@/types/user.types";
import { formatDate } from "@/utils/formatDate";
import { isDemoAccount } from "@/environments/demo";
import {
  Loader2,
  Search,
  ShieldCheck,
  ShieldOff,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const UsersAdmin = () => {
  const { token } = useAuth();
  const { userData } = useData();
  const [users, setUsers] = useState<adminUserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<adminUserType | null>(null);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    getAdminUsers(token)
      .then(setUsers)
      .catch(() => setPopupMessage("Não foi possível carregar os usuários"))
      .finally(() => setIsLoading(false));
  }, [token]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
    );
  }, [users, search]);

  const adminsCount = users.filter((u) => u.access_level === "ADMIN").length;

  const handleToggleRole = async (user: adminUserType) => {
    if (!token) return;
    const next = user.access_level === "ADMIN" ? "USER" : "ADMIN";
    setBusyId(user.id);
    try {
      await setUserRole(user.id, next, token);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, access_level: next } : u))
      );
      setPopupMessage(
        next === "ADMIN"
          ? `${user.name} agora é administrador`
          : `${user.name} agora é usuário`
      );
    } catch (err) {
      setPopupMessage(apiErrorMessage(err, "Não foi possível alterar o acesso"));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!token || !toDelete) return;
    setBusyId(toDelete.id);
    try {
      await deleteUserAsAdmin(toDelete.id, token);
      setUsers((prev) => prev.filter((u) => u.id !== toDelete.id));
      setPopupMessage(`${toDelete.name} foi excluído`);
      setToDelete(null);
    } catch (err) {
      setPopupMessage(apiErrorMessage(err, "Não foi possível excluir o usuário"));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-80">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            className="field pl-10"
            placeholder="Buscar por nome ou e-mail"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {!isLoading && (
          <p className="text-xs text-slate-500">
            {users.length} usuários · {adminsCount}{" "}
            {adminsCount === 1 ? "administrador" : "administradores"}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10 text-slate-400">
          <Loader2 className="animate-spin" size={22} />
        </div>
      ) : (
        <ul className="glass divide-y divide-white/[0.06] overflow-hidden">
          {filtered.map((user) => {
            const isSelf = user.id === userData?.id;
            // Contas usadas pela entrada automática da demo não podem mudar
            const isDemo = isDemoAccount(user.email);
            const isAdmin = user.access_level === "ADMIN";
            const busy = busyId === user.id;
            return (
              <li
                key={user.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <ProfilePic name={user.name} size="sm" />
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white">
                      <span className="truncate">{user.name}</span>
                      {isAdmin && (
                        <span className="chip border-nebula-400/30 bg-nebula-500/10 text-nebula-300">
                          Admin
                        </span>
                      )}
                      {isDemo && !isSelf && (
                        <span className="chip border-white/10 bg-white/[0.04] text-slate-400">
                          Demo
                        </span>
                      )}
                      {isSelf && (
                        <span className="chip border-white/10 bg-white/[0.04] text-slate-400">
                          Você
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-slate-400">{user.email}</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Desde {formatDate(user.createdAt)} · {user.postsCount} posts ·{" "}
                      {user.commentsCount} comentários
                    </p>
                  </div>
                </div>
                {!isSelf && !isDemo && (
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      className="btn-secondary px-3 py-2 text-xs"
                      disabled={busy}
                      onClick={() => handleToggleRole(user)}
                    >
                      {isAdmin ? <ShieldOff size={14} /> : <ShieldCheck size={14} />}
                      {isAdmin ? "Tornar usuário" : "Tornar admin"}
                    </button>
                    <button
                      type="button"
                      title={
                        isAdmin
                          ? "Rebaixe para usuário antes de excluir"
                          : "Excluir usuário"
                      }
                      className="icon-btn hover:bg-rose-500/10 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-30"
                      disabled={busy || isAdmin}
                      onClick={() => setToDelete(user)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="p-8 text-center text-sm text-slate-500">
              Nenhum usuário encontrado.
            </li>
          )}
        </ul>
      )}

      {toDelete && (
        <ModalPostLayout handleModalPost={() => setToDelete(null)}>
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
              <TriangleAlert size={22} />
            </span>
            <h1 className="mt-4 text-lg font-semibold text-white">
              Excluir {toDelete.name}?
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Os {toDelete.postsCount} posts, {toDelete.commentsCount} comentários e
              as curtidas dessa pessoa também serão apagados. Essa ação não pode
              ser desfeita.
            </p>
            <div className="mt-6 grid w-full grid-cols-2 gap-3">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setToDelete(null)}
              >
                Cancelar
              </button>
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={busyId === toDelete.id}
              >
                {busyId === toDelete.id ? "Excluindo..." : "Excluir"}
              </Button>
            </div>
          </div>
        </ModalPostLayout>
      )}
      {popupMessage && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </section>
  );
};

export default UsersAdmin;
