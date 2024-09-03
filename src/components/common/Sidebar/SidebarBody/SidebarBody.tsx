import { useData } from "@/providers/DataProvider";
import { isAdmin } from "@/utils/isAdmin";
import { BookOpen, Handshake, Home, Images } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarBody = () => {
  const { userData } = useData();
  return (
    <nav className="m- mt-12">
      <ul className="flex flex-col gap-6 text-gray-300 font-semibold">
        <Link to={"/"}>
          <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 mx-2 rounded-xl">
            <div className="flex gap-2 px-4">
              <Home />
              Homepage
            </div>
          </li>
        </Link>
        <Link to={"/history"}>
          <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 mx-2 rounded-xl">
            <div className="flex gap-2 px-4">
              <BookOpen />
              Astronomia e história
            </div>
          </li>
        </Link>
        <Link to={"/people"}>
          <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 mx-2 rounded-xl">
            <div className="flex gap-2 px-4">
              <Handshake />
              Rede
            </div>
          </li>
        </Link>
        {/* <Link to={"/galery"}>
          <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 mx-2 rounded-xl">
            <div className="flex gap-2 px-4">
              <Images />
              Galeria espacial
            </div>
          </li>
        </Link> */}
        {isAdmin(userData) && (
          <Link to={"/admin"}>
            <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 mx-2 rounded-xl">
              <div className="flex gap-2 px-4">
                <Images />
                Painel Administrativo
              </div>
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default SidebarBody;
