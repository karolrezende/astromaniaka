import AstronomersBody from "@/components/AstronomersBody/AstronomersBody";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Astronomers = () => {
  return (
    <AuthGuard>
      <StarsLayout>
        <main className="min-h-screen min-w-full">
          <Header />
          <Sidebar />
          <AstronomersBody />
        </main>
      </StarsLayout>
    </AuthGuard>
  );
};

export default Astronomers;
