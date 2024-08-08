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
    <div>
      {posts.map((post) => {
        return <Post post={post} key={post.id} />;
      })}

      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </div>
  );
};

export default AdminPostTable;
