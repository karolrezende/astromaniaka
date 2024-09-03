import Button from "../common/Button/Button";
import ProfilePic from "../common/ProfilePic/ProfilePic";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PeopleCard = ({ user }: any) => {
  return (
    <div className="bg-white min-w-[300px] rounded-md">
      <div className="p-6 text-center">
        <header className="flex justify-center flex-col items-center">
          <ProfilePic name={user.name} bg="bg-gray-400 text-white" />
          <p className="mt-2 uppercase font-bold">{user.name}</p>
        </header>
        <p>{user.description ? user.description : "Sem descrição"}</p>
        <Button className="w-full bg-slate-700">Acessar o perfil</Button>
      </div>
    </div>
  );
};

export default PeopleCard;
