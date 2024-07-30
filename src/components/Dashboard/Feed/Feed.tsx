import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import { getAllPosts } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { Access_Level_enum, Type_post_enum } from "@/utils/enums";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost/DeletePost";
import EditPost from "./EditPost/EditPost";

const Feed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[]>([]);
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const [modalEditPost, setModalEditPost] = useState<boolean>(false);
  const { userData } = useData();
  const [selectedPostType, setSelectedPostType] = useState<string>("");
  const [postId, setPostId] = useState<string>("");
  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        const posts = await getAllPosts(token);
        setPosts(posts as postType[]);
      }
    };

    fetchPosts();
  }, [token]);

  const verifyIsOwnerOrAdmin = (id: string) => {
    if (
      userData?.id === id ||
      userData?.access_level == Access_Level_enum.ADMIN
    ) {
      return true;
    }
  };

  const handleDeletePostModal = () => {
    setModalDeletePost(!modalDeletePost);
  };
  const handleEditPostModal = async () => {
    setModalEditPost(!modalEditPost);
  };

  const handlePostTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostType(e.target.value);
  };

  const filteredPosts = selectedPostType
    ? posts.filter((post) => post.post_type === selectedPostType)
    : posts;

  return (
    <section className="mt-6 flex flex-col gap-3 rounded-2xl w-[99%] text-white">
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
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col rounded-2xl bg-black/70 border-4 p-2"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-2 px-3 py-2 rounded-2xl">
                <ProfilePic bg="bg-gray-400" name={post.user.name} />
                {post.user.name}
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-white text-gray-800 h-auto rounded-md p-1 text-xs">
                  {post.post_type}
                </div>
                {verifyIsOwnerOrAdmin(post.user.id) && (
                  <>
                    <Pencil
                      size={20}
                      className="cursor-pointer"
                      onClick={handleEditPostModal()}
                    />
                    <Trash2
                      size={20}
                      onClick={handleDeletePostModal()}
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
                id={post.id}
              />
            )}
            {modalEditPost && (
              <EditPost
                handleEditPostModal={handleEditPostModal}
                id={post.id}
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
