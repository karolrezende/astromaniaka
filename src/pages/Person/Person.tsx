import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import PersonBody from "@/components/PersonBody/PersonBody";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Person = () => {
  return (
    <>
      <AuthGuard>
        <StarsLayout>
          <main className="min-h-screen min-w-full">
            <Header />
            <Sidebar />
            <PersonBody />
          </main>
        </StarsLayout>
      </AuthGuard>
    </>
  );
};

export default Person;
