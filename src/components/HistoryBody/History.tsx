import { Pencil, Trash2 } from "lucide-react";
import { useData } from "@/providers/DataProvider";
import { useState } from "react";
import ModalEditHistory from "./ModalNewHistory/ModalEditHistory";
import ModalDeleteHistory from "./ModalNewHistory/ModalDeleteHistory";
import { Access_Level_enum } from "@/utils/enums";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const History = ({ history }: any) => {
  const { userData } = useData();
  const [modalDeleteHistory, setModalDeleteHistory] = useState<boolean>(false);
  const [modalEditHistory, setModalEditHistory] = useState<boolean>(false);

  const handleDeleteHistoryModal = () => {
    setModalDeleteHistory(!modalDeleteHistory);
  };

  const handleEditHistoryModal = () => {
    setModalEditHistory(!modalEditHistory);
  };

  return (
    <li className="relative">
      {/* Marcador da linha do tempo */}
      <span className="absolute -left-[2.45rem] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-accent shadow-glow ring-4 ring-space-950" />
      <article className="glass animate-fade-in p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">{history.title}</h2>
          {userData?.access_level == Access_Level_enum.ADMIN && (
            <div className="-mr-2 -mt-1 flex shrink-0 gap-1">
              <button
                type="button"
                title="Editar"
                className="icon-btn"
                onClick={() => handleEditHistoryModal()}
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                title="Excluir"
                className="icon-btn hover:bg-rose-500/10 hover:text-rose-300"
                onClick={() => handleDeleteHistoryModal()}
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
        <p className="mt-2 leading-relaxed text-slate-300">{history.description}</p>
      </article>
      {modalDeleteHistory && (
        <ModalDeleteHistory
          handleDeleteHistoryModal={handleDeleteHistoryModal}
          history={history!}
        />
      )}
      {modalEditHistory && (
        <ModalEditHistory
          handleEditHistoryModal={handleEditHistoryModal}
          history={history!}
        />
      )}
    </li>
  );
};

export default History;
