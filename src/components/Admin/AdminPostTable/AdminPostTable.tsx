import { useAuth } from "@/providers/AuthProvider";
import { getAllPostsToAprove } from "@/services/admin.services";
import Post from "./Post";
import { useEffect, useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";

const AdminPostTable = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[] | []>([]);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Algo deu errado");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPostsToAprove(token!);
        setPosts(data);
      } catch (error) {
        setPopup(true);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4  rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)] gap-2">
        <h1 className="text-3xl bg-gray-600/80 text-white uppercase font-medium mr-3 rounded-md px-4 py-2">
          Painel administrativo
        </h1>
        {posts.length > 0 ? (
          posts.map((post) => <Post post={post} key={post.id} />)
        ) : (
          <p className="text-center text-gray-500 mt-6 text-lg">
            Nenhum post foi encontrado
          </p>
        )}

        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </section>
  );
};

export default AdminPostTable;
