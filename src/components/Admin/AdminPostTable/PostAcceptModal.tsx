import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";
import { acceptPost } from "@/services/post.services";

const PostAcceptModal = ({
  handleAcceptPostModal,
  post,
}: {
  handleAcceptPostModal: () => void;
  post: postType;
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível aceitar o post"
  );
  const handleAcceptPost = async () => {
    setIsLoading(true);
    try {
      const res = await acceptPost(post.id, token!);
      console.log(res);
      setPopup(true);
      setPopupMessage("O post foi aceito!");

      setTimeout(() => {
        handleAcceptPostModal();
        window.location.reload();
      }, 1000);
    } catch (err) {
      setPopup(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleAcceptPostModal}>
      <div>
        <h1 className="text-gray-900 text-md font-bold">
          Deseja realmente aceitar este post?
        </h1>
        <h4 className="text-gray-700 text-center mt-2">"{post.title}"</h4>
        <div onClick={handleAcceptPost}>
          <Button className="px-2 w-full mt-4" disabled={isLoading}>
            {isLoading ? "Excluindo..." : "Confirmar"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default PostAcceptModal;
