import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { apiErrorMessage, rejectPost } from "@/services/admin.services";
import { postType } from "@/types/post.types";
import { MessageSquareX } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "Conteúdo fora do tema de astronomia.",
  "Faltam informações ou fontes para o que foi publicado.",
  "Anúncios e vendas não são permitidos no feed.",
];

const RejectPostModal = ({
  post,
  handleClose,
  onRejected,
}: {
  post: postType;
  handleClose: () => void;
  onRejected: (id: string) => void;
}) => {
  const { token } = useAuth();
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const isValid = reason.trim().length >= 3;

  const handleReject = async () => {
    if (!isValid || !token) return;
    setIsLoading(true);
    try {
      await rejectPost(post.id, reason.trim(), token);
      onRejected(post.id);
      handleClose();
    } catch (err) {
      setPopupMessage(apiErrorMessage(err, "Não foi possível recusar o post"));
      setIsLoading(false);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleClose}>
      <div className="flex flex-col">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
          <MessageSquareX size={22} />
        </span>
        <h1 className="mt-4 text-lg font-semibold text-white">Recusar post</h1>
        <p className="mt-1 text-sm text-slate-400">
          "{post.title}" · {post.user.name} verá o motivo no perfil e poderá
          editar e reenviar.
        </p>

        <label className="field-label mt-5" htmlFor="reject-reason">
          Motivo da recusa
        </label>
        <textarea
          id="reject-reason"
          rows={4}
          maxLength={500}
          autoFocus
          className="field resize-none"
          placeholder="Explique de forma gentil o que precisa mudar"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              className="chip cursor-pointer normal-case tracking-normal border-white/10 bg-white/[0.03] py-1 text-slate-400 transition hover:text-slate-200"
              onClick={() => setReason(text)}
            >
              {text}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="btn-secondary" onClick={handleClose}>
            Cancelar
          </button>
          <Button
            variant="danger"
            onClick={handleReject}
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Recusando..." : "Recusar post"}
          </Button>
        </div>
      </div>
      {popupMessage && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default RejectPostModal;
