import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { createComment } from "@/services/comment.services";
import { postType } from "@/types/post.types";
import { userWithoutPassword } from "@/types/user.types";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const PostComment = ({
  user,
  post,
}: {
  user: userWithoutPassword;
  post: postType;
}) => {
  const { token } = useAuth();
  const [comment, setComment] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível comentar no post"
  );
  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      const commentData = {
        postId: post.id,
        description: comment,
        userId: user.id!,
      };
      const commentted = await createComment(commentData, token!);
      if (commentted) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setPopupMessage("Não foi possível comentar no post");
      setPopup(true);
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
            disabled={!comment.trim()}
            className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-accent text-white transition hover:brightness-110 disabled:opacity-30"
          >
            <SendHorizontal size={15} />
          </button>
        </div>
        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </form>
    </>
  );
};

export default PostComment;
