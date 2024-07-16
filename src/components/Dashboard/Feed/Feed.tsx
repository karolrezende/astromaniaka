import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import { getAllPosts } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { Access_Level_enum } from "@/utils/enums";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DeletePost from "./DeletePost/DeletePost";

const Feed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[]>([]);
  const [modalDeletePost, setModalDeletePost] = useState<boolean>(false);
  const { userData } = useData();

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

  return (
    <section className="mt-6 flex flex-col gap-3 rounded-2xl w-[99%] text-white">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col rounded-2xl border-4 p-2">
          <div className="flex justify-between">
            <div className="flex  items-center gap-2 px-3 py-2 rounded-2xl">
              <ProfilePic bg="bg-gray-400" name={post.user.name} />
              {post.user.name}
            </div>
            {verifyIsOwnerOrAdmin(post.user.id) && (
              <div className="p-2 cursor-pointer">
                <Trash2 />
              </div>
            )}
          </div>
          <div className="p-3 ">
            <h2 className="text-2xl border-b-2 border-gray-700 py-2">
              {post.title}
            </h2>
            <div className="py-1">{post.description}</div>
          </div>
        </div>
      ))}
      {modalDeletePost && <DeletePost />}
    </section>
  );
};

export default Feed;
