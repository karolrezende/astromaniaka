/* eslint-disable @typescript-eslint/no-explicit-any */
import { useData } from "@/providers/DataProvider";
import SelectAstronomerModal from "./SelectAstronomerModal";
import { useState } from "react";
import RemoveAstronomerModal from "./RemoveAstronomerModal";
import ProfilePic from "../common/ProfilePic/ProfilePic";
import { Plus, Settings, Telescope, X } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileBody = () => {
  const { userData } = useData();
  const [isModal, setIsModal] = useState(false);
  const [astronomerSelected, setAstronomerSelected] = useState<any>(false);
  const [isModalRemoveAstronomer, setIsModalRemoveAstronomer] = useState(false);
  const handleSelectAstronomerModal = () => {
    setIsModal(!isModal);
  };
  const handleRemoveAstronomerModal = () => {
    setIsModalRemoveAstronomer(!isModalRemoveAstronomer);
  };
  return (
    <section className="page">
      <div className="page-inner max-w-3xl">
        <div className="glass relative overflow-hidden p-8">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-nebula-600/30 via-stardust-600/20 to-transparent" />
          <header className="relative flex flex-col items-center gap-4 pt-6 text-center sm:flex-row sm:items-end sm:text-left">
            <ProfilePic name={userData?.name} size="xl" className="ring-4 ring-space-900" />
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-nebula-300">
                Meu perfil
              </p>
              <h1 className="text-2xl font-semibold text-white md:text-3xl">
                {userData?.name}
              </h1>
              <p className="mt-1 text-slate-400">
                {userData?.description ? userData?.description : "Sem descrição"}
              </p>
            </div>
            <Link to={"/configs"} className="btn-secondary">
              <Settings size={16} />
              Editar
            </Link>
          </header>
        </div>

        <div className="glass p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <Telescope size={18} className="text-nebula-300" />
            Meus astrônomos favoritos
          </h2>
          <p className="mt-1 text-sm text-slate-400">Escolha até três.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[...Array(3)].map((_, index) => {
              const astronomer = userData?.astronomers?.[index];

              return astronomer ? (
                <div
                  key={index}
                  className="surface group relative flex items-center gap-3 p-3"
                  title={`${astronomer.name}`}
                >
                  <ProfilePic name={astronomer.name} size="sm" />
                  <span className="truncate pr-6 text-sm font-medium text-slate-100">
                    {astronomer.name}
                  </span>
                  <button
                    type="button"
                    title="Remover"
                    className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-rose-500/15 hover:text-rose-300"
                    onClick={() => {
                      handleRemoveAstronomerModal(),
                        setAstronomerSelected(astronomer);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  key={index}
                  className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 p-3 text-sm text-slate-400 transition hover:border-nebula-400/50 hover:bg-nebula-500/5 hover:text-nebula-300"
                  onClick={() => handleSelectAstronomerModal()}
                >
                  <Plus size={16} />
                  Adicionar
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {isModal && (
        <SelectAstronomerModal
          userId={userData!.id}
          handleSelectAstronomerModal={handleSelectAstronomerModal}
        />
      )}
      {isModalRemoveAstronomer && (
        <RemoveAstronomerModal
          userId={userData!.id}
          astronomer={astronomerSelected}
          handleRemoveAstronomerModal={handleRemoveAstronomerModal}
        />
      )}
    </section>
  );
};

export default ProfileBody;
