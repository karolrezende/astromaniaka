import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "../common/Button/Button";
import { deleteUser } from "@/services/user.services";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import Popup from "../common/Popup/Popup";
import { useState } from "react";

const DeleteUser = ({ handleDeleteUser }: { handleDeleteUser: () => void }) => {
  const { token, signout } = useAuth();
  const { userData } = useData();
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível excluir o perfil"
  );
  const handleDelete = async () => {
    try {
      await deleteUser(userData!.id, token!);

      setPopup(true);
      setPopupMessage("Perfil excluído com sucesso!");

      setTimeout(() => {
        signout();
      }, 4000);
    } catch (error) {
      setPopup(true);
      setPopupMessage("Ops, não foi possível excluir o perfil");
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleDeleteUser}>
      <div className="">
        <h1 className="text-2xl text-red-500 font-bold">ATENÇÃO</h1>
        <h4 className=" font-bold">DESEJA REALMENTE EXCLUIR SEU PERFIL?</h4>
        <div>Essa ação é irreversível</div>
        <Button className="w-full " onClick={handleDelete}>
          Aceito e quero excluir meu perfil
        </Button>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default DeleteUser;
