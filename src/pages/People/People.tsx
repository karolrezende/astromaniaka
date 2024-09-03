import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import PeopleBody from "@/components/PeopleBody/PeopleBody";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const People = () => {
  return (
    <>
      <AuthGuard>
        <StarsLayout>
          <main className="min-h-screen min-w-full">
            <Header />
            <Sidebar />
            <PeopleBody />
          </main>
        </StarsLayout>
      </AuthGuard>
    </>
  );
};

export default People;
