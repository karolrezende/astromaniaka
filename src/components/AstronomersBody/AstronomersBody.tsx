import { useAuth } from "@/providers/AuthProvider";
import { getAllAstronomers } from "@/services/astronomer.services";
import { useEffect, useState } from "react";
import ProfilePic from "../common/ProfilePic/ProfilePic";
import { formatDate } from "@/utils/formatDate";

const AstronomersBody = () => {
  const { token } = useAuth();
  const [astronomers, setAstronomers] = useState([]);
  useEffect(() => {
    const fetchAstronomers = async () => {
      const user = await getAllAstronomers(token!);
      setAstronomers(user);
    };
    fetchAstronomers();
  }, [token]);

  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
        {astronomers ? (
          <div className="flex gap-2 flex-col overflow-auto">
            {astronomers.map((astronomer) => {
              return (
                <div key={astronomer.id}>
                  <div className="flex flex-col bg-gray-400 p-6 gap-2  rounded-md">
                    <header className="flex bg-gray-400 gap-2 items-center ">
                      <ProfilePic
                        name={astronomer.name}
                        bg="p-1 bg-gray-200 min-h-10 min-w-10"
                      />
                      <p className="font-semibold text-lg">
                        {" "}
                        {astronomer.name}
                      </p>
                    </header>
                    <div className="p-6">
                      <span className="text-sm">
                        <span className="font-semibold">
                          {" "}
                          Data de nascimento:
                        </span>{" "}
                        {formatDate(astronomer.birthday)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-white/60 text-center">
            Nenhum astrônomo encontrado
          </div>
        )}
      </div>
    </section>
  );
};

export default AstronomersBody;
