import Button from "@/components/common/Button/Button";
import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import DeletePost from "@/components/Dashboard/Feed/DeletePost/DeletePost";
import { postType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { getPostTypeMeta } from "@/utils/postTypes";
import { Check, X } from "lucide-react";
import { useState } from "react";
import PostAcceptModal from "./PostAcceptModal";

const Post = ({ post }: { post: postType }) => {
  const [postSelected, setPostSelected] = useState<postType>();
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalAcceptPost, setModalAcceptPost] = useState<boolean>(false);

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
          <div className="flex items-center gap-3">
            <ProfilePic name={post.user?.name} size="sm" />
            <div>
              <p className="text-sm font-semibold text-white">{post.user.name}</p>
              <p className="text-xs text-slate-500">{formatDate(post.createdAt)}</p>
            </div>
            <span className={`chip ${typeMeta.chip}`}>{typeMeta.label}</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">{post.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{post.description}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="success"
            onClick={() => (handleAcceptPostModal(), setPostSelected(post))}
          >
            <Check size={16} />
            Aprovar
          </Button>
          <Button
            variant="danger"
            onClick={() => (handleDeletePostModal(), setPostSelected(post))}
          >
            <X size={16} />
            Recusar
          </Button>
        </div>
      </div>

      {modalDeletePost && (
        <DeletePost
          handleDeletePostModal={handleDeletePostModal}
          post={postSelected!}
        />
      )}
      {modalAcceptPost && (
        <PostAcceptModal
          handleAcceptPostModal={handleAcceptPostModal}
          post={postSelected!}
        />
      )}
    </article>
  );
};

export default Post;
