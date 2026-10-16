import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { deletePosts } from "@/services/post.services";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";
import { Trash2 } from "lucide-react";

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
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
          <Trash2 size={22} />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-white">
          Excluir este post?
        </h1>
        <p className="mt-1 text-sm text-slate-400">"{post.title}"</p>
        <p className="mt-1 text-xs text-slate-500">Essa ação não pode ser desfeita.</p>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={handleDeletePostModal}>
            Cancelar
          </button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default DeletePost;
