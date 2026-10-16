/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeft, Telescope, UserX } from "lucide-react";
import ProfilePic from "../common/ProfilePic/ProfilePic";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user.services";
import { useAuth } from "@/providers/AuthProvider";

const PersonBody = () => {
  const url = window.location.href;
  const id = url.split("/person/")[1];
  const { token } = useAuth();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      const user = await getUserById(id, token);
      setUser(user);
    };
    fetchUser();
  }, [id, token]);
  return (
    <section className="page">
      <div className="page-inner max-w-3xl">
        <div>
          <button
            type="button"
            className="btn-ghost -ml-2 px-3"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
        {user ? (
          <>
            <div className="glass relative overflow-hidden p-8">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-nebula-600/30 via-stardust-600/20 to-transparent" />
              <header className="relative flex flex-col items-center gap-4 pt-6 text-center sm:flex-row sm:items-end sm:text-left">
                <ProfilePic name={user.name} size="xl" className="ring-4 ring-space-900" />
                <div>
                  <h1 className="text-2xl font-semibold text-white md:text-3xl">
                    {user.name}
                  </h1>
                  <p className="mt-1 text-slate-400">
                    {user.description ? user.description : "Sem descrição"}
                  </p>
                </div>
              </header>
            </div>
            <div className="glass p-6 sm:p-8">
              <h2 className="flex items-center gap-2 font-semibold text-white">
                <Telescope size={18} className="text-nebula-300" />
                Astrônomos favoritos
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[...Array(3)].map((_, index) => {
                  const astronomer = user?.astronomers?.[index];

                  return astronomer ? (
                    <div
                      key={index}
                      className="surface flex items-center gap-3 p-3"
                      title={astronomer.name}
                    >
                      <ProfilePic name={astronomer.name} size="sm" />
                      <span className="truncate text-sm font-medium text-slate-100">
                        {astronomer.name}
                      </span>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl border border-dashed border-white/10 p-3 text-sm text-slate-500"
                    >
                      Vazio
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
            <UserX size={36} className="text-nebula-300" />
            <p className="text-slate-300">Usuário não encontrado!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonBody;
