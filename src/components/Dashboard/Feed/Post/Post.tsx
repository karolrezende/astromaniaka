import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { postType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { getPostTypeMeta } from "@/utils/postTypes";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import DeletePost from "../DeletePost/DeletePost";
import EditPost from "../EditPost/EditPost";
import { useData } from "@/providers/DataProvider";
import { useState } from "react";
import { Access_Level_enum } from "@/utils/enums";
import PostComment from "./PostComment";
import PostAllComments from "./PostAllComments";

const Post = ({ post }: { post: postType }) => {
  const { userData } = useData();
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalEditPost, setModalEditPost] = useState<boolean>(false);
  const [postSelected, setPostSelected] = useState<postType>();
  const verifyIsOwnerOrAdmin = (id: string) => {
    return (
      userData?.id === id || userData?.access_level == Access_Level_enum.ADMIN
    );
  };

  const handleDeletePostModal = () => {
    setModalDeletePost(!modalDeletePost);
  };

  const handleEditPostModal = () => {
    setModalEditPost(!modalEditPost);
  };

  const typeMeta = getPostTypeMeta(post.post_type);
  const commentsCount = post.comments?.length ?? 0;

  return (
    <article
      key={post.id}
      className="glass animate-fade-in p-5 transition hover:border-white/[0.12] sm:p-6"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ProfilePic name={post.user.name} />
          <div>
            <p className="text-sm font-semibold text-white">{post.user.name}</p>
            <p className="text-xs text-slate-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className={`chip mr-1 ${typeMeta.chip}`}>{typeMeta.label}</span>
          {verifyIsOwnerOrAdmin(post.user.id) && (
            <>
              <button
                type="button"
                title="Editar"
                className="icon-btn"
                onClick={() => (handleEditPostModal(), setPostSelected(post))}
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                title="Excluir"
                className="icon-btn hover:bg-rose-500/10 hover:text-rose-300"
                onClick={() => (handleDeletePostModal(), setPostSelected(post))}
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </header>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-white">{post.title}</h2>
        <p className="mt-2 whitespace-pre-line leading-relaxed text-slate-300">
          {post.description}
        </p>
      </div>

      {modalDeletePost && (
        <DeletePost
          handleDeletePostModal={handleDeletePostModal}
          post={postSelected!}
        />
      )}
      {modalEditPost && (
        <EditPost
          handleEditPostModal={handleEditPostModal}
          post={postSelected!}
        />
      )}

      <div className="mt-5 border-t border-white/[0.06] pt-4">
        <h3 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          <MessageCircle size={14} />
          {commentsCount === 1 ? "1 comentário" : `${commentsCount} comentários`}
        </h3>
        <div className="mt-2 flex max-h-[240px] flex-col gap-2 overflow-y-auto pr-1">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <PostAllComments key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="py-1 text-sm text-slate-500">
              Ainda sem comentários, diga algo...
            </p>
          )}
        </div>
      </div>
      <PostComment user={userData!} post={post!} />
    </article>
  );
};

export default Post;
