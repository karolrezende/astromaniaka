import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <StarsLayout>
      <main className=" p-10 py-16 rounded-2xl">
        <div className="flex flex-col gap-6 ">
          <p className="text-2xl  lg:text-4xl xl:text-5xl uppercase text-center font-extrabold text-white">
            Você se perdeu na imensidão do espaço
          </p>
          <Link to={'/'}className="bg-white min-w-48 self-center rounded-md text-slate-950 p-2 text-center">
          <p >
            Volte para o início
          </p>
          </Link>
        </div>
      </main>
    </StarsLayout>
  );
};

export default Notfound;
