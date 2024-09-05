import { ArrowLeft } from "lucide-react";
import ProfilePic from "../common/ProfilePic/ProfilePic";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user.services";

const PersonBody = () => {
  const url = window.location.href;
  const id = url.split("/person/")[1];
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(id);
      setUser(user);
    };
    fetchUser();
  }, [id]);
  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
        <div>
          <button
            className="bg-slate-200 rounded-full text-gray-700 p-3"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowLeft />
          </button>
        </div>
        <div className="flex justify-center">
          {user ? (
            <div className="bg-white w-[70%] p-20 rounded-2xl">
              <header className="flex items-center gap-5">
                <ProfilePic name={user.name} bg="bg-gray-400 text-white" />
                <h1 className="text-3xl uppercase font-semibold text-gray-700">
                  {user.name}
                </h1>
              </header>

              <div className="text-gray-700 text-xl mt-5">
                {user.description ? user.description : "Sem descrição"}
              </div>
            </div>
          ) : (
            <div className="text-white text-center">
              Usuário não encontrado!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonBody;
