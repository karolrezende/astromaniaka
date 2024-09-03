import { useAuth } from "@/providers/AuthProvider";
import Button from "../common/Button/Button";
import { useEffect, useState } from "react";
import { useData } from "@/providers/DataProvider";
import { editUser } from "@/services/user.services";
import Popup from "../common/Popup/Popup";
import { Pencil } from "lucide-react";
import DeleteUser from "./DeleteUser";

const ConfigsBody = () => {
  const { token } = useAuth();
  const { userData } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível editar o perfil"
  );

  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);

  const [deleteUser, setDeleteUser] = useState(false);
  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData]);

  const handleEditUser = async () => {
    setIsLoading(true);
    try {
      if (userData && token) {
        const editedPost = await editUser(userData.id, { name, email }, token);
        if (editedPost) {
          setPopupMessage("Perfil editado com sucesso!");
        } else {
          setPopupMessage("Não foi possível editar o perfil");
        }
        setPopup(true);
      }
    } catch (error) {
      setPopupMessage("Não foi possível editar o perfil");
      setPopup(true);
    }
    setIsLoading(false);
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  const handleDeleteUser = () => {
    setDeleteUser(!deleteUser);
  };

  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)] items-center justify-center">
        <div className="bg-white p-10 rounded-2xl">
          <div className="">
            <header>
              <h1 className="text-2xl">Meu perfil</h1>
            </header>
            <div>
              <div className="flex flex-col mt-2">
                <label className="text-xs ml-1" htmlFor="name">
                  Nome
                </label>
                <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" rounded-lg p-1 px-2 outline-none "
                  />
                  <Pencil className="cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label className="text-xs ml-1" htmlFor="email">
                  Email
                </label>
                <div className="flex border-2 rounded-2xl items-center px-2 py-1 border-zinc-700">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" rounded-lg p-1 px-2 outline-none "
                  />
                  <Pencil className="cursor-pointer" />
                </div>
              </div>
            </div>

            <Button className="px-2 w-full mt-4" onClick={handleEditUser}>
              {isLoading ? "Aguarde..." : "Editar perfil"}
            </Button>
            <Button
              className=" w-full mt-2 bg-transparent border-2 hover:bg-slate-100 border-red-500 text-red-500 "
              onClick={handleDeleteUser}
            >
              Excluir perfil
            </Button>
          </div>
        </div>
      </div>
      {deleteUser && <DeleteUser handleDeleteUser={handleDeleteUser} />}
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </section>
  );
};

export default ConfigsBody;
