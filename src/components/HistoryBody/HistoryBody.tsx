import { useData } from "@/providers/DataProvider";
import Button from "../common/Button/Button";
import { Access_Level_enum } from "@/utils/enums";
import { BookOpen, Plus } from "lucide-react";
import ModalNewHistory from "./ModalNewHistory/NewHistory";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { getAllHistory } from "@/services/history.services";
import History from "./History";

const HistoryBody = () => {
  const { userData } = useData();
  const { token } = useAuth();
  const [isModal, setIsModal] = useState(false);
  const [allHistory, setAllHistory] = useState([]);

  const handleModalHistory = () => {
    setIsModal(!isModal);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (token) {
        const historys = await getAllHistory(token);
        setAllHistory(historys);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <section className="page">
      <div className="page-inner">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="page-title">Astronomia e história</h1>
            <p className="page-subtitle">
              Marcos que mudaram a forma como olhamos para o céu.
            </p>
          </div>
          {userData?.access_level == Access_Level_enum.ADMIN && (
            <Button onClick={() => handleModalHistory()}>
              <Plus size={16} />
              Novo fato
            </Button>
          )}
        </header>
        {allHistory && allHistory.length > 0 ? (
          <ol className="relative ml-3 flex flex-col gap-5 border-l border-white/10 pl-8">
            {allHistory.map((history, index) => (
              <History key={index} history={history} />
            ))}
          </ol>
        ) : (
          <div className="glass flex flex-col items-center gap-3 px-6 py-14 text-center">
            <BookOpen size={36} className="text-nebula-300" />
            <p className="text-slate-300">Ainda sem fatos históricos.</p>
          </div>
        )}
      </div>
      {isModal && <ModalNewHistory handleModalHistory={handleModalHistory} />}
    </section>
  );
};

export default HistoryBody;
