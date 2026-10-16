import { useAuth } from "@/providers/AuthProvider";
import { getFeed } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { Type_post_enum } from "@/utils/enums";
import { postTypeMeta } from "@/utils/postTypes";
import { Loader2, Orbit, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Post from "./Post/Post";

const PAGE_SIZE = 10;

const Feed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedPostType, setSelectedPostType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  // Evita que uma resposta antiga sobrescreva a busca mais recente
  const requestId = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchValue.trim()), 350);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const fetchPage = async (pageToLoad: number, append: boolean) => {
    if (!token) return;
    const current = ++requestId.current;
    setIsLoading(true);
    setError(false);
    try {
      const data = await getFeed(token, {
        page: pageToLoad,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
        type: selectedPostType || undefined,
      });
      if (current !== requestId.current) return;
      setPosts((prev) => (append ? [...prev, ...data.items] : data.items));
      setPage(data.page);
      setTotal(data.total);
      setHasMore(data.hasMore);
    } catch {
      if (current === requestId.current) setError(true);
    } finally {
      if (current === requestId.current) setIsLoading(false);
    }
  };

  // Filtro ou busca mudou: recomeça da primeira página
  useEffect(() => {
    fetchPage(1, false);
  }, [token, debouncedSearch, selectedPostType]);

  const filterClass = (active: boolean) =>
    `chip cursor-pointer py-1 transition ${
      active
        ? "border-nebula-400/50 bg-nebula-500/20 text-white"
        : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
    }`;

  const hasFilters = Boolean(debouncedSearch || selectedPostType);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            className="field px-11"
            placeholder="Buscar por título, conteúdo ou autor..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              title="Limpar busca"
              className="icon-btn absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={() => setSearchValue("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={filterClass(selectedPostType === "")}
            onClick={() => setSelectedPostType("")}
          >
            Todos
          </button>
          {Object.values(Type_post_enum).map((type) => (
            <button
              type="button"
              key={type}
              className={filterClass(selectedPostType === type)}
              onClick={() => setSelectedPostType(type)}
            >
              {postTypeMeta[type].label}
            </button>
          ))}
        </div>
        {hasFilters && !isLoading && (
          <p className="text-xs text-slate-500">
            {total === 1 ? "1 post encontrado" : `${total} posts encontrados`}
          </p>
        )}
      </div>

      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}

      {isLoading && (
        <div className="flex justify-center py-6 text-slate-400">
          <Loader2 className="animate-spin" size={22} />
        </div>
      )}

      {!isLoading && error && (
        <div className="glass flex flex-col items-center gap-3 px-6 py-10 text-center">
          <p className="text-slate-300">Não foi possível carregar o feed.</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => fetchPage(1, false)}
          >
            Tentar de novo
          </button>
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
          <Orbit size={36} className="text-nebula-300" />
          <p className="text-slate-300">Nenhum post encontrado.</p>
          <p className="text-sm text-slate-500">
            {hasFilters
              ? "Tente outra busca ou outro filtro."
              : "Seja a primeira pessoa a publicar."}
          </p>
        </div>
      )}

      {!isLoading && hasMore && (
        <button
          type="button"
          className="btn-secondary self-center px-6"
          onClick={() => fetchPage(page + 1, true)}
        >
          Carregar mais
        </button>
      )}

      {!isLoading && !hasMore && posts.length > 0 && (
        <p className="py-2 text-center text-xs text-slate-500">
          Você chegou ao fim do universo conhecido ✦
        </p>
      )}
    </section>
  );
};

export default Feed;
