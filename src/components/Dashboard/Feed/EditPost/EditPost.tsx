import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { editPost } from "@/services/post.services";
import { postType } from "@/types/post.types";

const EditPost = ({
  handleEditPostModal,
  post,
}: {
  handleEditPostModal: () => void;
  post: postType;
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível editar o post"
  );
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const handleEditPost = async () => {
    setIsLoading(true);
    try {
      const editedPost = await editPost(
        post.id,
        { title, description },
        token!
      );
      if (editedPost) {
        setPopupMessage("Post editado com sucesso!");
        setPopup(true);
      } else {
        setPopupMessage("Não foi possível editar o post");
        setPopup(true);
      }

      setTimeout(() => {
        handleEditPostModal();
      }, 3000);

      window.location.reload();
    } catch (error) {
      setPopupMessage("Não foi possível editar o post");
      setPopup(true);
    }
    setIsLoading(false);
  };

  return (
    <ModalPostLayout handleModalPost={handleEditPostModal}>
      <div>
        <h1 className="text-lg font-semibold text-white">Editar post</h1>
        <div className="mt-5 flex w-full flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="title">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
            />
          </div>

          <div>
            <label className="field-label" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field resize-none"
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={handleEditPostModal}>
            Cancelar
          </button>
          <Button disabled={isLoading} onClick={() => handleEditPost()}>
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default EditPost;
