import Button from "@/components/common/Button/Button";
import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import DeletePost from "@/components/Dashboard/Feed/DeletePost/DeletePost";
import { postType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { getPostTypeMeta } from "@/utils/postTypes";
import { Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import PostAcceptModal from "./PostAcceptModal";
import RejectPostModal from "./RejectPostModal";

const Post = ({
  post,
  onRejected,
}: {
  post: postType;
  onRejected: (id: string) => void;
}) => {
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalAcceptPost, setModalAcceptPost] = useState<boolean>(false);
  const [modalRejectPost, setModalRejectPost] = useState<boolean>(false);

  const handleAcceptPostModal = () => {
    setModalAcceptPost(!modalAcceptPost);
  };
  const handleDeletePostModal = () => {
    setModalDeletePost(!modalDeletePost);
  };

  const typeMeta = getPostTypeMeta(post.post_type);

  return (
    <article className="glass animate-fade-in p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <ProfilePic name={post.user?.name} size="sm" />
            <div>
              <p className="text-sm font-semibold text-white">{post.user.name}</p>
              <p className="text-xs text-slate-500">{formatDate(post.createdAt)}</p>
            </div>
            <span className={`chip ${typeMeta.chip}`}>{typeMeta.label}</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
          <p className="mt-1 whitespace-pre-line text-sm text-slate-300">
            {post.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="success" onClick={handleAcceptPostModal}>
            <Check size={16} />
            Aprovar
          </Button>
          <Button variant="danger" onClick={() => setModalRejectPost(true)}>
            <X size={16} />
            Recusar
          </Button>
          <button
            type="button"
            title="Excluir definitivamente (spam)"
            className="icon-btn hover:bg-rose-500/10 hover:text-rose-300"
            onClick={handleDeletePostModal}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {modalDeletePost && (
        <DeletePost handleDeletePostModal={handleDeletePostModal} post={post} />
      )}
      {modalAcceptPost && (
        <PostAcceptModal
          handleAcceptPostModal={handleAcceptPostModal}
          post={post}
        />
      )}
      {modalRejectPost && (
        <RejectPostModal
          post={post}
          handleClose={() => setModalRejectPost(false)}
          onRejected={onRejected}
        />
      )}
    </article>
  );
};

export default Post;
