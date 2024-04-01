import DashboardBody from "@/components/Dashboard/DashboardBody";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import AuthGuard from "@/guards/AuthGuard";
import StarsLayout from "@/layout/StarsLayout/StarsLayout";

const Dashboard = () => {

    return (

        <AuthGuard>

            <StarsLayout>
            <main className="min-h-screen bg-gray-900 min-w-full">
                <Header/>
                <Sidebar/>
                <DashboardBody/>
            </main>
            </StarsLayout>
        </AuthGuard>

    )

}

export default Dashboard;