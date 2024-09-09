import { useData } from "@/providers/DataProvider";
import Button from "../common/Button/Button";
import { Access_Level_enum } from "@/utils/enums";
import { Plus } from "lucide-react";
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
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
        {userData?.access_level == Access_Level_enum.ADMIN && (
          <Button
            className="bg-white  hover:bg-white/90 w-[20%] self-end flex items-center justify-center gap-1"
            style={{ color: "rgb(16 11 31 / var(--tw-bg-opacity))" }}
            onClick={() => handleModalHistory()}
          >
            <Plus size="16" />
            Novo
          </Button>
        )}
        <div className="grid gap-2 grid-flow-col">
          {allHistory && allHistory.length > 0 ? (
            allHistory.map((history, index) => (
              <History key={index} history={history} />
            ))
          ) : (
            <p className="text-gray-200/50">Ainda sem posts..</p>
          )}
        </div>
      </div>
      {isModal && <ModalNewHistory handleModalHistory={handleModalHistory} />}
    </section>
  );
};

export default HistoryBody;
