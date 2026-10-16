import EditPost from "@/components/Dashboard/Feed/EditPost/EditPost";
import DeletePost from "@/components/Dashboard/Feed/DeletePost/DeletePost";
import { useAuth } from "@/providers/AuthProvider";
import { getMyPosts } from "@/services/post.services";
import { myPostType, postStatus, postType } from "@/types/post.types";
import { formatDate } from "@/utils/formatDate";
import { getPostTypeMeta } from "@/utils/postTypes";
import {
  FileText,
  Heart,
  Loader2,
  MessageCircle,
  PenLine,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

const statusMeta: Record<postStatus, { label: string; chip: string }> = {
  ACCEPTED: {
    label: "Publicado",
    chip: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
  PENDING: {
    label: "Em análise",
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  },
  REJECTED: {
    label: "Recusado",
    chip: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  },
};

const filters: { value: postStatus | ""; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "ACCEPTED", label: "Publicados" },
  { value: "PENDING", label: "Em análise" },
  { value: "REJECTED", label: "Recusados" },
];

// EditPost/DeletePost esperam um postType; aqui só precisamos de id, título e descrição
const asPost = (post: myPostType) => post as unknown as postType;

const MyPosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<myPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<postStatus | "">("");
  const [editing, setEditing] = useState<myPostType | null>(null);
  const [deleting, setDeleting] = useState<myPostType | null>(null);

  useEffect(() => {
    if (!token) return;
    getMyPosts(token)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setIsLoading(false));
  }, [token]);

  const visible = filter ? posts.filter((p) => p.status === filter) : posts;
  const count = (status: postStatus) =>
    posts.filter((p) => p.status === status).length;

  return (
    <div className="glass p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 font-semibold text-white">
          <FileText size={18} className="text-nebula-300" />
          Minhas publicações
        </h2>
        <div className="flex flex-wrap gap-2">
          {filters.map(({ value, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => setFilter(value)}
              className={`chip cursor-pointer py-1 transition ${
                filter === value
                  ? "border-nebula-400/50 bg-nebula-500/20 text-white"
                  : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
              }`}
            >
              {label}
              {value && count(value) > 0 && (
                <span className="ml-1.5 opacity-70">{count(value)}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8 text-slate-400">
          <Loader2 className="animate-spin" size={20} />
        </div>
      ) : visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          {posts.length === 0
            ? "Você ainda não publicou nada."
            : "Nenhuma publicação com esse status."}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {visible.map((post) => {
            const status = statusMeta[post.status];
            const type = getPostTypeMeta(post.post_type);
            return (
              <li key={post.id} className="surface p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`chip ${status.chip}`}>{status.label}</span>
                      <span className={`chip ${type.chip}`}>{type.label}</span>
                      <span className="text-xs text-slate-500">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold text-white">{post.title}</h3>
                    <p className="mt-0.5 line-clamp-2 text-sm text-slate-400">
                      {post.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      title="Editar"
                      className="icon-btn"
                      onClick={() => setEditing(post)}
                    >
                      <PenLine size={16} />
                    </button>
                    <button
                      type="button"
                      title="Excluir"
                      className="icon-btn hover:bg-rose-500/10 hover:text-rose-300"
                      onClick={() => setDeleting(post)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {post.status === "REJECTED" && (
                  <div className="mt-3 rounded-lg border border-rose-400/20 bg-rose-500/[0.07] p-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-rose-300">
                      Motivo da recusa
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      {post.rejection_reason}
                    </p>
                    <button
                      type="button"
                      className="link mt-2 text-sm"
                      onClick={() => setEditing(post)}
                    >
                      Editar e reenviar para análise →
                    </button>
                  </div>
                )}

                {post.status === "ACCEPTED" && (
                  <div className="mt-3 flex gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart size={13} /> {post.likesCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={13} /> {post.commentsCount}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {editing && (
        <EditPost
          post={asPost(editing)}
          handleEditPostModal={() => setEditing(null)}
        />
      )}
      {deleting && (
        <DeletePost
          post={asPost(deleting)}
          handleDeletePostModal={() => setDeleting(null)}
        />
      )}
    </div>
  );
};

export default MyPosts;
