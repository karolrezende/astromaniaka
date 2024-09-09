/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "../common/Popup/Popup";
import Button from "../common/Button/Button";
import { removeUserAstronomer } from "@/services/astronomer.services";

const RemoveAstronomerModal = ({
  handleRemoveAstronomerModal,
  astronomer,
  userId,
}: {
  handleRemoveAstronomerModal: () => void;
  astronomer: any;
  userId: string;
}) => {
  const { token } = useAuth();
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível criar o post"
  );
  const handleDeleteAstronomer = async () => {
    try {
      const data = {
        astronomerId: astronomer.id,
        userId: userId,
      };
      const deletedAstronomer = await removeUserAstronomer(token!, data);
      setPopup(true);
      if (deletedAstronomer != 204) {
        setPopupMessage("Houve um erro ao remover astrônomo");
        return;
      }
      setPopupMessage("Astrônomo removido com sucesso!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch {
      setPopup(true);
      setPopupMessage("Houve um erro ao remover astrônomo");
    }
  };
  return (
    <ModalPostLayout handleModalPost={handleRemoveAstronomerModal}>
      <div>
        <h1 className="text-lg font-bold">
          Deseja realmente remover o astronomo <br /> abaixo do seu perfil?
        </h1>
        <p>"{astronomer.name}"</p>
        <Button className="w-full" onClick={() => handleDeleteAstronomer()}>
          Confirmar
        </Button>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default RemoveAstronomerModal;
