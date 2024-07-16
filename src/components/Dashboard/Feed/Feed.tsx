import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useAuth } from "@/providers/AuthProvider";
import { getAllPosts } from "@/services/post.services";
import { postType } from "@/types/post.types";
import { useEffect, useState } from "react";

const Feed = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        const posts = await getAllPosts(token);
        setPosts(posts as postType[]);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <section className="mt-6 flex flex-col gap-3 rounded-md max-h-[100%] ">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-700 flex flex-col rounded-md">
          <div className="flex  items-center gap-2 px-3 py-2 bg-gray-600 rounded-md">
            <ProfilePic name={post.user.name} />
            {post.user.name}
          </div>
          <div className="p-3">
            <h2 className="text-2xl ">{post.title}</h2>
            <div>{post.description}</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Feed;
