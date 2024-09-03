import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import ConfigsBody from "@/components/Configs/ConfigsBody";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Configs = () => {
  return (
    <AuthGuard>
      <StarsLayout>
        <main className="min-h-screen min-w-full">
          <Header />
          <Sidebar />
          <ConfigsBody />
        </main>
      </StarsLayout>
    </AuthGuard>
  );
};

export default Configs;
