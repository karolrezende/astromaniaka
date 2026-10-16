import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { deleteComment, editComment } from "@/services/comment.services";
import { postCommentType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

const PostAllComments = ({
  comment,
  canManage,
  onUpdated,
  onDeleted,
}: {
  comment: postCommentType;
  canManage: boolean;
  onUpdated: (comment: postCommentType) => void;
  onDeleted: (id: string) => void;
}) => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [draft, setDraft] = useState(comment.description);
  const [isSaving, setIsSaving] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSave = async () => {
    const description = draft.trim();
    if (!description || !token) return;
    if (description === comment.description) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await editComment(comment.id, description, token);
      onUpdated({ ...comment, description, updatedAt: new Date() });
      setIsEditing(false);
    } catch {
      setPopupMessage("Não foi possível editar o comentário");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    setIsSaving(true);
    try {
      await deleteComment(comment.id, token);
      onDeleted(comment.id);
    } catch {
      setPopupMessage("Não foi possível apagar o comentário");
      setIsSaving(false);
      setIsConfirmingDelete(false);
    }
  };

  return (
    <div className="group flex gap-3 rounded-xl bg-white/[0.03] p-3">
      <ProfilePic size="sm" name={comment?.user?.name} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-sm font-medium text-slate-100">
            {comment.user.name}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <p className="text-[11px] text-slate-500">
              {formatDate(comment.createdAt)}
              {comment.updatedAt && " · editado"}
            </p>
            {canManage && !isEditing && !isConfirmingDelete && (
              <div className="flex opacity-100 transition sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                <button
                  type="button"
                  title="Editar comentário"
                  className="icon-btn h-6 w-6"
                  onClick={() => (setDraft(comment.description), setIsEditing(true))}
                >
                  <Pencil size={12} />
                </button>
                <button
                  type="button"
                  title="Apagar comentário"
                  className="icon-btn h-6 w-6 hover:bg-rose-500/10 hover:text-rose-300"
                  onClick={() => setIsConfirmingDelete(true)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <form
            className="mt-1.5 flex items-center gap-2"
            onSubmit={(e) => (e.preventDefault(), handleSave())}
          >
            <input
              autoFocus
              className="field py-1.5"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setIsEditing(false)}
            />
            <button
              type="submit"
              title="Salvar"
              disabled={isSaving || !draft.trim()}
              className="icon-btn h-8 w-8 shrink-0 text-emerald-300 disabled:opacity-40"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              title="Cancelar"
              className="icon-btn h-8 w-8 shrink-0"
              onClick={() => setIsEditing(false)}
            >
              <X size={16} />
            </button>
          </form>
        ) : (
          <p className="mt-0.5 whitespace-pre-line break-words text-sm text-slate-300">
            {comment.description}
          </p>
        )}

        {isConfirmingDelete && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400">Apagar este comentário?</span>
            <button
              type="button"
              disabled={isSaving}
              className="rounded-full bg-rose-500/20 px-3 py-1 font-medium text-rose-200 transition hover:bg-rose-500/30"
              onClick={handleDelete}
            >
              {isSaving ? "Apagando..." : "Apagar"}
            </button>
            <button
              type="button"
              className="rounded-full px-3 py-1 text-slate-400 transition hover:bg-white/[0.06]"
              onClick={() => setIsConfirmingDelete(false)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
      {popupMessage && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </div>
  );
};

export default PostAllComments;
