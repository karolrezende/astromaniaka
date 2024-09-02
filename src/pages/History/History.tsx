import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import HistoryBody from "@/components/HistoryBody/HistoryBody";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const History = () => {
  return (
    <AuthGuard>
      <StarsLayout>
        <main className="min-h-screen min-w-full">
          <Header />
          <Sidebar />
          <HistoryBody />
        </main>
      </StarsLayout>
    </AuthGuard>
  );
};

export default History;
