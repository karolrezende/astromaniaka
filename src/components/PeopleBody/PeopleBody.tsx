import { getAllUser } from "@/services/user.services";
import { useEffect, useState } from "react";
import PeopleCard from "./PeopleCard";

const PeopleBody = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const users = await getAllUser();
      setAllUsers(users);
    };

    fetchPosts();
  }, []);

  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
        {allUsers && allUsers.length > 0 ? (
          <div className="flex flex-wrap gap-10  justify-center lg:justify-start">
            {" "}
            {allUsers.map((user) => {
              return <PeopleCard user={user} key={user!.id} />;
            })}
          </div>
        ) : (
          <p className="text-white/50 text-center">Ainda sem nenhum usuário</p>
        )}
      </div>
    </section>
  );
};

export default PeopleBody;
