import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";
import { createComment } from "@/services/comment.services";
import { postType } from "@/types/post.types";
import { userWithoutPassword } from "@/types/user.types";
import { MessageCircle } from "lucide-react";
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
      <div className="mx-2 flex gap-2 pb-4 bg-grey-400 rounded-2xl cursor-pointer items-center">
        <MessageCircle className="text-white/50" />
        <textarea
          className="text-white/50 border-none outline-none  h-6 w-full bg-transparent"
          placeholder="Comentar..."
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <Button onClick={() => handleComment()}>Enviar</Button>
        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </>
  );
};

export default PostComment;
