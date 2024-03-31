import { BookOpen, Home, Images } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarBody = () => {
    return (<nav className="m-6 mt-12">

        <ul className="flex flex-col gap-6 text-gray-300 font-semibold">
            <Link to={'/'}>
                <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 rounded-xl">
                    <Home />
                    Homepage
                </li>
            </Link>
            <Link to={'/astro-history'}>
                <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 rounded-xl">
                    <BookOpen />
                    Astronomia e história
                </li>
            </Link>
            <Link to={'/galery'}>
                <li className="flex gap-2 text-lg cursor-pointer hover:bg-slate-700 select-none items-center px-1 py-2 rounded-xl">
                    <Images />
                    Galeria espacial
                </li>
            </Link>

        </ul>



    </nav>);
}

export default SidebarBody;