/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/providers/AuthProvider";
import { getAllAstronomers } from "@/services/astronomer.services";
import { useEffect, useState } from "react";
import ProfilePic from "../common/ProfilePic/ProfilePic";
import { formatDate } from "@/utils/formatDate";
import { Cake, Telescope } from "lucide-react";

const AstronomersBody = () => {
  const { token } = useAuth();
  const [astronomers, setAstronomers] = useState<any[]>([]);
  useEffect(() => {
    const fetchAstronomers = async () => {
      const user = await getAllAstronomers(token!);
      setAstronomers(user);
    };
    fetchAstronomers();
  }, [token]);

  return (
    <section className="page">
      <div className="page-inner">
        <header>
          <h1 className="page-title">Astrônomos</h1>
          <p className="page-subtitle">
            As mentes que nos ajudaram a entender o cosmos.
          </p>
        </header>
        {astronomers && astronomers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {astronomers.map((astronomer) => {
              return (
                <article
                  key={astronomer.id}
                  className="glass flex animate-fade-in flex-col gap-4 p-5 transition hover:border-nebula-400/30"
                >
                  <header className="flex items-center gap-3">
                    <ProfilePic name={astronomer.name} size="lg" />
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {astronomer.name}
                      </h2>
                      <p className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Cake size={13} />
                        {formatDate(astronomer.birthday)}
                      </p>
                    </div>
                  </header>
                  {astronomer.description && (
                    <p className="text-sm leading-relaxed text-slate-300">
                      {astronomer.description}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
            <Telescope size={36} className="text-nebula-300" />
            <p className="text-slate-300">Nenhum astrônomo encontrado</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AstronomersBody;
