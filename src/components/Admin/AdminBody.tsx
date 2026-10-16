import { useAuth } from "@/providers/AuthProvider";
import { getAllPostsToAprove } from "@/services/admin.services";

import { useEffect, useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";
import Post from "./Post/Post";
import AstronomersRegister from "./Astronomers/AstronomersRegister";
import { Inbox } from "lucide-react";

const AdminBody = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[] | []>([]);
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Algo deu errado");

  const [tab, setTab] = useState(1);
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

  const tabClass = (active: boolean) =>
    `flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
      active
        ? "bg-gradient-accent text-white shadow-glow"
        : "text-slate-400 hover:text-white"
    }`;

  return (
    <section className="page">
      <div className="page-inner">
        <header>
          <h1 className="page-title">Painel administrativo</h1>
          <p className="page-subtitle">
            Modere publicações e cadastre novos astrônomos.
          </p>
        </header>
        <div className="glass flex gap-1 p-1">
          <button onClick={() => setTab(1)} className={tabClass(tab === 1)}>
            Posts pendentes
            {posts.length > 0 && (
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
                {posts.length}
              </span>
            )}
          </button>
          <button onClick={() => setTab(2)} className={tabClass(tab === 2)}>
            Cadastrar astrônomo
          </button>
        </div>
        {tab === 1 && (
          <div className="flex flex-col gap-3">
            {posts.length > 0 ? (
              posts.map((post) => <Post post={post} key={post.id} />)
            ) : (
              <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
                <Inbox size={36} className="text-nebula-300" />
                <p className="text-slate-300">Nenhum post aguardando aprovação</p>
              </div>
            )}
          </div>
        )}
        {tab === 2 && <AstronomersRegister />}
        {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </section>
  );
};

export default AdminBody;
