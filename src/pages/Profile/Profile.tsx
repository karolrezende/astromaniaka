import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import ProfileBody from "@/components/Profile/ProfileBody";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Profile = () => {
  return (
    <AuthGuard>
      <StarsLayout>
        <main className="min-h-screen min-w-full">
          <Header />
          <Sidebar />
          <ProfileBody />
        </main>
      </StarsLayout>
    </AuthGuard>
  );
};

export default Profile;
