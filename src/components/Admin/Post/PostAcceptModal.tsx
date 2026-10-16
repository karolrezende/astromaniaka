import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";
import { acceptPost } from "@/services/post.services";
import { Check } from "lucide-react";

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
      await acceptPost(post.id, token!);
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
      <div className="flex flex-col items-center text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
          <Check size={22} />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-white">
          Aprovar este post?
        </h1>
        <p className="mt-1 text-sm text-slate-400">"{post.title}"</p>
        <p className="mt-1 text-xs text-slate-500">Ele passará a aparecer no feed.</p>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={handleAcceptPostModal}>
            Cancelar
          </button>
          <Button variant="success" onClick={handleAcceptPost} disabled={isLoading}>
            {isLoading ? "Aprovando..." : "Aprovar"}
          </Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default PostAcceptModal;
