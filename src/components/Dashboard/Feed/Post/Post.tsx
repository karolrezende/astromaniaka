import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { postCommentType, postType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { getPostTypeMeta } from "@/utils/postTypes";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import DeletePost from "../DeletePost/DeletePost";
import EditPost from "../EditPost/EditPost";
import { useData } from "@/providers/DataProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";
import { Access_Level_enum } from "@/utils/enums";
import { toggleLike } from "@/services/post.services";
import PostComment from "./PostComment";
import PostAllComments from "./PostAllComments";

const Post = ({ post }: { post: postType }) => {
  const { userData } = useData();
  const { token } = useAuth();
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalEditPost, setModalEditPost] = useState<boolean>(false);
  const [postSelected, setPostSelected] = useState<postType>();
  const [comments, setComments] = useState<postCommentType[]>(
    post.comments ?? []
  );
  const [liked, setLiked] = useState(Boolean(post.likedByMe));
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);
  const [isLiking, setIsLiking] = useState(false);

  const isAdmin = userData?.access_level == Access_Level_enum.ADMIN;
  const verifyIsOwnerOrAdmin = (id: string) => userData?.id === id || isAdmin;

  const handleDeletePostModal = () => {
    setModalDeletePost(!modalDeletePost);
  };

  const handleEditPostModal = () => {
    setModalEditPost(!modalEditPost);
  };

  // Atualização otimista: muda na hora e desfaz se a API falhar
  const handleLike = async () => {
    if (!token || isLiking) return;
    const previous = { liked, likesCount };
    setLiked(!liked);
    setLikesCount(likesCount + (liked ? -1 : 1));
    setIsLiking(true);
    try {
      const result = await toggleLike(post.id, token);
      setLiked(result.liked);
      setLikesCount(result.likesCount);
    } catch {
      setLiked(previous.liked);
      setLikesCount(previous.likesCount);
    } finally {
      setIsLiking(false);
    }
  };

  const typeMeta = getPostTypeMeta(post.post_type);

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

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleLike}
          aria-pressed={liked}
          title={liked ? "Remover curtida" : "Curtir"}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            liked
              ? "border-rose-400/40 bg-rose-500/15 text-rose-300"
              : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-rose-400/30 hover:text-rose-300"
          }`}
        >
          <Heart size={16} className={liked ? "fill-current" : ""} />
          {likesCount}
        </button>
        <span className="inline-flex items-center gap-1.5 px-2 text-sm text-slate-400">
          <MessageCircle size={16} />
          {comments.length}
        </span>
      </div>

      <div className="mt-4 border-t border-white/[0.06] pt-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {comments.length === 1 ? "1 comentário" : `${comments.length} comentários`}
        </h3>
        <div className="mt-2 flex max-h-[280px] flex-col gap-2 overflow-y-auto pr-1">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <PostAllComments
                key={comment.id}
                comment={comment}
                canManage={verifyIsOwnerOrAdmin(comment.user.id)}
                onUpdated={(updated) =>
                  setComments((prev) =>
                    prev.map((c) => (c.id === updated.id ? updated : c))
                  )
                }
                onDeleted={(id) =>
                  setComments((prev) => prev.filter((c) => c.id !== id))
                }
              />
            ))
          ) : (
            <p className="py-1 text-sm text-slate-500">
              Ainda sem comentários, diga algo...
            </p>
          )}
        </div>
      </div>
      <PostComment
        user={userData!}
        post={post!}
        onCreated={(comment) => setComments((prev) => [...prev, comment])}
      />
    </article>
  );
};

export default Post;
