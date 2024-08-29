import Button from "@/components/common/Button/Button";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

const PostComment = () => {
  const [comment, setComment] = useState("");
  return (
    <>
      <div className="mx-2 flex gap-2 pb-4 bg-grey-400 rounded-2xl cursor-pointer items-center">
        <MessageCircle className="text-white/50" />
        <textarea
          className="text-white/50 border-none outline-none  h-6 w-full bg-transparent"
          placeholder="Comentar..."
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <Button onClick={}>Enviar</Button>
      </div>
    </>
  );
};

export default PostComment;
