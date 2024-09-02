/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import { deleteHistory } from "@/services/history.services";
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
      <div className="min-w-[700px] flex flex-col ">
        <h1 className="text-xl font-bold">
          Deseja realmente deletar a publicação?
        </h1>
        <p className="text-md  mt-2">"{history.title}"</p>
        <Button onClick={() => handleDeleteHistory()}>Editar</Button>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalDeleteHistory;
