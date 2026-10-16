import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { createComment } from "@/services/comment.services";
import { postCommentType, postType } from "@/types/post.types";
import { userWithoutPassword } from "@/types/user.types";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const PostComment = ({
  user,
  post,
  onCreated,
}: {
  user: userWithoutPassword;
  post: postType;
  onCreated: (comment: postCommentType) => void;
}) => {
  const { token } = useAuth();
  const [comment, setComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleComment = async () => {
    const description = comment.trim();
    if (!description || !user || isSending) return;
    setIsSending(true);
    try {
      const created = await createComment(
        { postId: post.id, description, userId: user.id! },
        token!
      );
      if (!created?.id) throw new Error("Falha ao comentar");
      // A API devolve só o comentário; o autor é o próprio usuário logado
      onCreated({
        id: created.id,
        description: created.description,
        createdAt: created.createdAt,
        updatedAt: null,
        user: { id: user.id!, name: user.name },
      });
      setComment("");
    } catch (error) {
      console.log(error);
      setPopupMessage("Não foi possível comentar no post");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <form
        className="mt-3 flex items-center gap-3"
        onSubmit={(e) => (e.preventDefault(), handleComment())}
      >
        <ProfilePic size="sm" name={user?.name} />
        <div className="relative flex-1">
          <input
            className="field rounded-full py-2 pr-12"
            placeholder="Escreva um comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            title="Enviar"
            disabled={!comment.trim() || isSending}
            className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-accent text-white transition hover:brightness-110 disabled:opacity-30"
          >
            <SendHorizontal size={15} />
          </button>
        </div>
        {popupMessage && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </form>
    </>
  );
};

export default PostComment;
