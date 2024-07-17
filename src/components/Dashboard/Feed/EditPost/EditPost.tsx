import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "@/components/common/Popup/Popup";

const EditPost = ({
  handleEditPostModal,
  id,
}: {
  handleEditPostModal: () => void;
  id: string;
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível apagar o post"
  );

  return (
    <ModalPostLayout handleModalPost={handleEditPostModal}>
      <div>
        <h1 className="text-gray-900 text-md font-bold">
          Deseja realmente excluir este post?
        </h1>
        <div>
          <Button className="px-2 w-full mt-4" disabled={isLoading}>
            {isLoading ? "Excluindo..." : "Confirmar"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default EditPost;
