import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import { getAllPosts, selectPost } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { Access_Level_enum, Type_post_enum } from "@/utils/enums";
import { Pencil, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost/DeletePost";
import EditPost from "./EditPost/EditPost";
import { formatDate } from "@/utils/formatDate";

const Feed = () => {
  const { token } = useAuth();
  const { userData } = useData();
  const [allPosts, setAllPosts] = useState<postType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<postType[]>([]);
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalEditPost, setModalEditPost] = useState<boolean>(false);
  const [selectedPostType, setSelectedPostType] = useState<string>("");
  const [postSelected, setPostSelected] = useState<postType>();
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
        filteredPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col rounded-2xl bg-black/40 border-4 p-2"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl">
                <ProfilePic bg="bg-gray-400" name={post.user.name} />
                {post.user.name}
              </div>

              <div className="flex gap-2 items-center">
                <div className="text-white h-auto rounded-md p-1 text-xs">
                  {formatDate(post.createdAt)}
                </div>
                <div className="bg-white text-gray-800 h-auto rounded-md p-1 text-xs">
                  {post.post_type}
                </div>
                {verifyIsOwnerOrAdmin(post.user.id) && (
                  <>
                    <Pencil
                      size={20}
                      className="cursor-pointer"
                      onClick={() => (
                        handleEditPostModal(), setPostSelected(post)
                      )}
                    />
                    <Trash2
                      size={20}
                      onClick={() => (
                        handleDeletePostModal(), setPostSelected(post)
                      )}
                      className="cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="p-3">
              <h2 className="text-2xl border-b-2 border-gray-700 py-2">
                {post.title}
              </h2>
              <div className="py-1">{post.description}</div>
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
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Nenhum post encontrado.</p>
      )}
    </section>
  );
};

export default Feed;
