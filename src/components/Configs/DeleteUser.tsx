import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "../common/Button/Button";
import { deleteUser } from "@/services/user.services";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import Popup from "../common/Popup/Popup";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";

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
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
          <TriangleAlert size={22} />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-white">
          Deseja realmente excluir seu perfil?
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Essa ação é irreversível. Seus dados não poderão ser recuperados.
        </p>
        <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
          <button type="button" className="btn-secondary" onClick={handleDeleteUser}>
            Cancelar
          </button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir meu perfil
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default DeleteUser;
