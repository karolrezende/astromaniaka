import { useAuth } from "@/providers/AuthProvider";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {

    const { signout} = useAuth()


    return (<div className="bg-white rounded-lg p-2 absolute top-[6.3rem] right-9 select-none">

        <ul className="flex flex-col  ">
            <Link to={'/profile'}>
            <li className="flex cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-lg gap-1 text-md justify-start items-center">
                <User />
                Meu perfil
            </li>
            </Link>
            <Link to={'/configs'}> 
            <li className="flex cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-lg gap-1 text-md justify-start items-center">
                <Settings />
                Configurações
            </li>
            </Link>
            <div className="w-full h-[0.5px] my-1 bg-black/20"></div>
            <li className="flex cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-lg gap-1 text-md justify-start items-center hover:text-red-600" onClick={()=> signout()}>
                <LogOut />
                Sair
            </li>
        </ul>
    </div>);
}

export default ProfileMenu;