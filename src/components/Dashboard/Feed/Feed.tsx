import { useAuth } from "@/providers/AuthProvider";
import { getAllPosts } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { Type_post_enum } from "@/utils/enums";
import { postTypeMeta } from "@/utils/postTypes";
import { Orbit, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Post from "./Post/Post";

const Feed = () => {
  const { token } = useAuth();
  const [allPosts, setAllPosts] = useState<postType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<postType[]>([]);

  const [selectedPostType, setSelectedPostType] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        const posts = await getAllPosts(token);
        setAllPosts(posts as postType[]);
        setFilteredPosts(posts as postType[]);
      }
    };

    fetchPosts();
  }, [token]);

  const handlePostTypeChange = (type: string) => {
    setSelectedPostType(type);
    applyFilters(type, searchValue);
  };

  const handleSearchPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    applyFilters(selectedPostType, value);
  };

  const applyFilters = (type: string, search: string) => {
    let filtered = allPosts;

    if (type) {
      filtered = filtered.filter((post) => post.post_type === type);
    }

    if (search) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const filterClass = (active: boolean) =>
    `chip cursor-pointer py-1 transition ${
      active
        ? "border-nebula-400/50 bg-nebula-500/20 text-white"
        : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200"
    }`;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            className="field pl-11"
            placeholder="Pesquisar posts pelo título..."
            value={searchValue}
            onChange={handleSearchPost}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={filterClass(selectedPostType === "")}
            onClick={() => handlePostTypeChange("")}
          >
            Todos
          </button>
          {Object.values(Type_post_enum).map((type) => (
            <button
              type="button"
              key={type}
              className={filterClass(selectedPostType === type)}
              onClick={() => handlePostTypeChange(type)}
            >
              {postTypeMeta[type].label}
            </button>
          ))}
        </div>
      </div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
          <Orbit size={36} className="text-nebula-300" />
          <p className="text-slate-300">Nenhum post encontrado.</p>
          <p className="text-sm text-slate-500">
            Tente outro filtro ou seja a primeira pessoa a publicar.
          </p>
        </div>
      )}
    </section>
  );
};

export default Feed;
