import DashboardBody from "@/components/Dashboard/DashboardBody";
import Header from "@/components/common/Header/Header";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import AuthGuard from "@/guards/AuthGuard";

const Dashboard = () => {

    return (

        <AuthGuard>
            <>
            <main className="min-h-screen bg-slate-900 min-w-full">
                <Header/>
                <Sidebar/>
                <DashboardBody/>
            </main>
            </>
        </AuthGuard>

    )

}

export default Dashboard;