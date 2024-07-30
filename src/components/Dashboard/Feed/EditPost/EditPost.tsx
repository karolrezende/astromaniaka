import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import Popup from "@/components/common/Popup/Popup";
import { editPost, getPostById } from "@/services/post.services"; // Assuming you have a service to fetch a post by ID

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
    "Não foi possível editar o post"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id, token!);
        setTitle(post!.title);
        setDescription(post!.description);
      } catch (error) {
        setPopupMessage("Não foi possível carregar o post");
        setPopup(true);
      }
    };
    fetchPost();
  }, [id, token]);

  const handleEditPost = async () => {
    setIsLoading(true);
    try {
      const post = await editPost(id, { title, description }, token!);
      if (post) {
        setPopupMessage("Post editado com sucesso!");
        setPopup(true);
      } else {
        setPopupMessage("Não foi possível editar o post");
        setPopup(true);
      }

      setTimeout(() => {
        handleEditPostModal();
      }, 1000);
    } catch (error) {
      setPopupMessage("Não foi possível editar o post");
      setPopup(true);
    }
    setIsLoading(false);
  };

  return (
    <ModalPostLayout handleModalPost={handleEditPostModal}>
      <div>
        <h1 className="text-gray-900 text-md font-bold">Editar</h1>
        <div>
          <div className="flex flex-col w-full min-w-[500px] text-gray-800 gap-3">
            <div className="flex flex-col mt-3">
              <label className="text-xs ml-1" htmlFor="title">
                Título
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 rounded-lg p-1 px-2 border-zinc-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs ml-1" htmlFor="description">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 rounded-lg p-1 px-2 border-zinc-800"
              />
            </div>
          </div>
          <Button
            className="px-2 w-full mt-4"
            disabled={isLoading}
            onClick={() => handleEditPost()}
          >
            {isLoading ? "Editando..." : "Confirmar"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default EditPost;
