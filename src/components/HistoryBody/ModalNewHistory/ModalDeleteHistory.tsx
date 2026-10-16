/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import { deleteHistory } from "@/services/history.services";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const ModalDeleteHistory = ({
  handleDeleteHistoryModal,
  history,
}: {
  handleDeleteHistoryModal: () => void;
  history: any;
}) => {
  const { token } = useAuth();
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível apagar o post"
  );
  const handleDeleteHistory = async () => {
    try {
      const res = await deleteHistory(history.id, token!);
      console.log(res);
      setPopup(true);
      setPopupMessage("Post apagado com sucesso!");

      setTimeout(() => {
        handleDeleteHistoryModal();
        window.location.reload();
      }, 1000);
    } catch (err) {
      setPopup(true);
      console.log(err);
    }
  };
  return (
    <ModalPostLayout handleModalPost={handleDeleteHistoryModal}>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
          <Trash2 size={22} />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-white">
          Apagar esta publicação?
        </h1>
        <p className="mt-1 text-sm text-slate-400">"{history.title}"</p>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={handleDeleteHistoryModal}>
            Cancelar
          </button>
          <Button variant="danger" onClick={() => handleDeleteHistory()}>
            Apagar
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalDeleteHistory;
