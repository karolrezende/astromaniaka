import StarsLayout from "@/layout/StarsLayout";

const Notfound = () => {
  return (
    <StarsLayout>
      <main className=" p-10 py-16 rounded-2xl">
        <div className="flex flex-col gap-6 ">
          <p className="text-md md:text-lg lg:text-5xl uppercase font-extrabold text-white">
            Não se perca na imensidão do espaço
          </p>
          <p className=" text-slate-950 p-2 text-center">
            Volte para tela de início
          </p>
        </div>
      </main>
    </StarsLayout>
  );
};

export default Notfound;
