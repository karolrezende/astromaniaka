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
      <div className="min-w-[700px] flex flex-col ">
        <h1 className="text-xl font-bold">Editar</h1>
        <textarea
          className="text-md font-bold mt-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          {history.title}
        </textarea>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <Button onClick={() => handleEditPost()}>Editar</Button>
      </div>

      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalEditHistory;
