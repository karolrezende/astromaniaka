import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { deletePosts } from "@/services/post.services";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";

const DeletePost = ({
  handleDeletePostModal,
  post,
}: {
  handleDeletePostModal: () => void;
  post: postType;
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível apagar o post"
  );
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await deletePosts(post.id, token!);
      console.log(res);
      setPopup(true);
      setPopupMessage("Post apagado com sucesso!");

      setTimeout(() => {
        handleDeletePostModal();
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
    <ModalPostLayout handleModalPost={handleDeletePostModal}>
      <div>
        <h1 className="text-gray-900 text-md font-bold">
          Deseja realmente excluir este post?
        </h1>
        <h4 className="text-gray-700 text-center mt-2">"{post.title}"</h4>
        <div onClick={handleDelete}>
          <Button className="px-2 w-full mt-4" disabled={isLoading}>
            {isLoading ? "Excluindo..." : "Confirmar"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default DeletePost;
