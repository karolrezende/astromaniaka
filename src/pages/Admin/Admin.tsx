import Uploader from "@/components/common/Uploader/Uploader";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";
import AdminBody from "@/components/Admin/AdminBody";

const Admin = () => {
  return (
    <>
      {/* <Uploader /> */}
      <AuthGuard>
        <StarsLayout>
          <main className="min-h-screen min-w-full">
            <Header />
            <Sidebar />
            <AdminBody />
          </main>
        </StarsLayout>
      </AuthGuard>
    </>
  );
};

export default Admin;
