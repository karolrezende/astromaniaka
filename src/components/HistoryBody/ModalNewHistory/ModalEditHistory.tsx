/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import { editHistory } from "@/services/history.services";
import { useState } from "react";

const ModalEditHistory = ({
  handleEditHistoryModal,
  history,
}: {
  handleEditHistoryModal: () => void;
  history: any;
}) => {
  const { token } = useAuth();
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível editar a publicação"
  );
  const [title, setTitle] = useState(history.title);
  const [description, setDescription] = useState(history.description);

  const handleEditPost = async () => {
    try {
      const editedPost = await editHistory(
        history.id,
        { title, description },
        token!
      );
      if (editedPost) {
        setPopupMessage("Publicação editada com sucesso!");
        setPopup(true);
      } else {
        setPopupMessage("Não foi possível editar a publicação");
        setPopup(true);
      }

      setTimeout(() => {
        handleEditHistoryModal();
      }, 3000);

      window.location.reload();
    } catch (error) {
      setPopupMessage("Não foi possível editar a publicação");
      setPopup(true);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleEditHistoryModal}>
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-white">Editar fato histórico</h1>
        <div className="mt-5 flex flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="history-title">
              Título
            </label>
            <input
              id="history-title"
              className="field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="history-description">
              Descrição
            </label>
            <textarea
              id="history-description"
              rows={5}
              className="field resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={handleEditHistoryModal}>
            Cancelar
          </button>
          <Button onClick={() => handleEditPost()}>Salvar</Button>
        </div>
      </div>

      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalEditHistory;
