import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <StarsLayout>
      <main className="flex animate-fade-in flex-col items-center px-6 text-center">
        <p className="bg-gradient-accent bg-clip-text font-display text-8xl font-bold text-transparent md:text-9xl">
          404
        </p>
        <h1 className="mt-4 max-w-xl text-2xl font-semibold text-white md:text-4xl">
          Você se perdeu na imensidão do espaço
        </h1>
        <p className="mt-3 text-slate-400">
          Essa órbita não existe. Que tal voltar para a base?
        </p>
        <Link to={"/"} className="btn-primary mt-8 px-6">
          Volte para o início
        </Link>
      </main>
    </StarsLayout>
  );
};

export default Notfound;
