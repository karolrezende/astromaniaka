import { Link } from "react-router-dom";
import ProfilePic from "../common/ProfilePic/ProfilePic";
import { isAdmin } from "@/utils/isAdmin";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PeopleCard = ({ user }: any) => {
  return (
    <article
      className="glass flex animate-fade-in flex-col items-center p-6 text-center transition hover:-translate-y-0.5 hover:border-nebula-400/30"
      key={user.id}
    >
      <ProfilePic name={user.name} size="lg" />
      <h2 className="mt-3 font-semibold text-white">{user.name}</h2>
      {isAdmin(user) && (
        <span className="chip mt-1 border-nebula-400/30 bg-nebula-500/10 text-nebula-300">
          Admin
        </span>
      )}
      <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm text-slate-400">
        {user.description ? user.description : "Sem descrição"}
      </p>
      <Link to={`/person/${user.id}`} className="btn-secondary mt-5 w-full">
        Ver perfil
      </Link>
    </article>
  );
};

export default PeopleCard;
