import { useData } from "@/providers/DataProvider";
import { Bell, MessageCircleMore } from "lucide-react";

const Profile = () => {

    const {userData} = useData()
    
    return ( <section >
        
        <div className="flex items-center justify-end p-4">
            <div>
                <Bell/>
            </div>
            <div>
                <MessageCircleMore/>
            </div>
            <div>
                <p>{(userData?.name)?.toUpperCase()}</p>
                <p>{userData?.access_level}</p>
            </div>
            <div className="bg-white h-14 w-14 rounded-full"></div>
        </div>
        
    </section> );
}
 
export default Profile;