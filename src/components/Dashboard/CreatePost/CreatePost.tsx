import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useData } from "@/providers/DataProvider";
import { Pen } from "lucide-react";
import { useState } from "react";
import ModalPost from "./ModalPost";


const CreatePost = () => {

    const { userData } = useData()
    const [isModal, setIsModal] = useState(false)

    const handleModalPost = () => { 
        setIsModal(!isModal)
    }

    return (
        <section className="flex items-center p-4 h-full gap-3">
            <ProfilePic />
            <div onClick={()=>handleModalPost()} className="flex text-sm lg:text-md justify-between bg-slate-600 w-full rounded-3xl p-2 lg:py-4 text-white/40 hover:text-white/90 
            cursor-pointer font-bold px-4 items-center" >
                <p >Que supernovas estão explodindo em sua mente hoje, {userData ? userData.name : "Astromaniako"}?</p>
                <Pen className="hidden md:flex" />
            </div>

            {
                isModal && <ModalPost handleModalPost={handleModalPost}/>
            }
        </section>
    );
}

export default CreatePost;