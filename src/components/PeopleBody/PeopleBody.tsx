/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUser } from "@/services/user.services";
import { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";
import { Users } from "lucide-react";

const PeopleBody = () => {
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const users = await getAllUser();
      setAllUsers(users);
    };

    fetchPosts();
  }, []);

  return (
    <section className="page">
      <div className="page-inner">
        <header>
          <h1 className="page-title">Rede</h1>
          <p className="page-subtitle">
            Conheça quem também vive com a cabeça nas estrelas.
          </p>
        </header>
        {allUsers && allUsers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {allUsers.map((user) => {
              return <PeopleCard user={user} key={user!.id} />;
            })}
          </div>
        ) : (
          <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
            <Users size={36} className="text-nebula-300" />
            <p className="text-slate-300">Ainda sem nenhum usuário</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PeopleBody;
