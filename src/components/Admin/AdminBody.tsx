import { useAuth } from "@/providers/AuthProvider";
import { getAllPostsToAprove } from "@/services/admin.services";

import { useEffect, useState } from "react";
import Popup from "@/components/common/Popup/Popup";
import { postType } from "@/types/post.types";
import Post from "./Post/Post";
import AstronomersRegister from "./Astronomers/AstronomersRegister";
import UsersAdmin from "./Users/UsersAdmin";
import { Inbox } from "lucide-react";

type AdminTab = "posts" | "users" | "astronomers";

const AdminBody = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState<postType[] | []>([]);
  const [popupMessage, setPopupMessage] = useState("");

  const [tab, setTab] = useState<AdminTab>("posts");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPostsToAprove(token!);
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        setPopupMessage("Algo deu errado");
      }
    };

    fetchPosts();
  }, [token]);

  const handleRejected = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    setPopupMessage("Post recusado. O autor verá o motivo no perfil.");
  };

  const tabClass = (active: boolean) =>
    `flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
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
            Modere publicações, gerencie usuários e cadastre astrônomos.
          </p>
        </header>
        <div className="glass flex gap-1 p-1">
          <button onClick={() => setTab("posts")} className={tabClass(tab === "posts")}>
            Posts pendentes
            {posts.length > 0 && (
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[11px]">
                {posts.length}
              </span>
            )}
          </button>
          <button onClick={() => setTab("users")} className={tabClass(tab === "users")}>
            Usuários
          </button>
          <button
            onClick={() => setTab("astronomers")}
            className={tabClass(tab === "astronomers")}
          >
            Astrônomos
          </button>
        </div>
        {tab === "posts" && (
          <div className="flex flex-col gap-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post post={post} key={post.id} onRejected={handleRejected} />
              ))
            ) : (
              <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
                <Inbox size={36} className="text-nebula-300" />
                <p className="text-slate-300">Nenhum post aguardando aprovação</p>
              </div>
            )}
          </div>
        )}
        {tab === "users" && <UsersAdmin />}
        {tab === "astronomers" && <AstronomersRegister />}
        {popupMessage && <Popup message={popupMessage} setMessage={setPopupMessage} />}
      </div>
    </section>
  );
};

export default AdminBody;
