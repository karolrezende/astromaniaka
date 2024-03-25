import Header from "@/components/Dashboard/Header/Header";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import AuthGuard from "@/guards/AuthGuard";

const Index = () => {

    return (

        <AuthGuard>
            <>
            <main className="min-h-screen bg-blue-900 min-w-full">
                <Header/>
                <Sidebar/>
            </main>
            </>
        </AuthGuard>

    )

}

export default Index;