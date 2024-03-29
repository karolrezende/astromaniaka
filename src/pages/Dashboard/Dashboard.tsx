import Header from "@/components/Dashboard/Header/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import AuthGuard from "@/guards/AuthGuard";

const Dashboard = () => {

    return (

        <AuthGuard>
            <>
            <main className="min-h-screen bg-slate-900 min-w-full">
                <Header/>
                <Sidebar/>
            </main>
            </>
        </AuthGuard>

    )

}

export default Dashboard;