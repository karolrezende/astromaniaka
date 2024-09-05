import { useAuth } from "@/providers/AuthProvider";
import { getAllPostsToAprove } from "@/services/admin.services";

import { useEffect, useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";
import Post from "./Post/Post";
import AstronomersRegister from "./Astronomers/AstronomersRegister";

const AdminBody = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[] | []>([]);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Algo deu errado");

  const [tab, setTab] = useState(1);
  const [tabCadastro, setTabCadastro] = useState(1);
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
        <h1 className="text-3xl bg-gray-100 text-gray-700 uppercase font-medium mr-3 rounded-md px-4 py-2">
          Painel administrativo
        </h1>
        <div className="flex w-full">
          <button
            onClick={() => setTab(1)}
            className="border-b-2 border-gray-200 text-center w-full text-gray-200  uppercase font-medium mr-3 rounded-md px-4 py-2"
          >
            Posts
          </button>
          <button
            onClick={() => setTab(2)}
            className="border-b-2 border-gray-200 text-center w-full text-gray-200  uppercase font-medium mr-3 rounded-md px-4 py-2"
          >
            Cadastro
          </button>
        </div>
        {tab === 1 && (
          <div>
            {posts.length > 0 ? (
              posts.map((post) => <Post post={post} key={post.id} />)
            ) : (
              <p className="text-center text-gray-500 mt-6 text-lg">
                Nenhum post foi encontrado
              </p>
            )}
          </div>
        )}
        {tab === 2 && (
          <div>
            <div className="w-full flex">
              <button
                onClick={() => setTabCadastro(1)}
                className="bg-gray-300 p-3 rounded-lg uppercase"
              >
                Astronomos
              </button>
            </div>
            {tabCadastro == 1 && <AstronomersRegister />}
          </div>
        )}
        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </section>
  );
};

export default AdminBody;
