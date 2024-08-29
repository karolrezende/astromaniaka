import { useAuth } from "@/providers/AuthProvider";
import { getAllPosts } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { Type_post_enum } from "@/utils/enums";
import { Search } from "lucide-react";
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

  const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostType(e.target.value);
    applyFilters(e.target.value, searchValue);
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

  return (
    <section className="mt-6 flex flex-col gap-3 rounded-2xl w-[99%] text-white">
      {/* Pesquisar */}
      <div className="flex justify-between">
        <div className="bg-white rounded-xl text-gray-800 flex items-center gap-2 px-3 py-1 hover:text-gray-600 cursor-pointer">
          <Search />
          <input
            className="text-gray-400 cursor-pointer outline-none"
            placeholder="Pesquisar posts"
            onChange={handleSearchPost}
          />
        </div>
        {/* Seletor de tipo */}
        <select
          className="w-36 self-end text-gray-800 rounded-md p-1 cursor-pointer"
          onChange={handlePostTypeChange}
          value={selectedPostType}
        >
          <option value="">TODOS</option>
          {Object.values(Type_post_enum).map((postType) => (
            <option key={postType} value={postType}>
              {postType}
            </option>
          ))}
        </select>
      </div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <p className="text-center text-gray-500">Nenhum post encontrado.</p>
      )}
    </section>
  );
};

export default Feed;
