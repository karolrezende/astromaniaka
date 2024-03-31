import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useData } from "@/providers/DataProvider";

const ModalPost = ({ handleModalPost }: { handleModalPost: () => void }) => {
    const { userData } = useData()
    return (<ModalPostLayout handleModalPost={handleModalPost}>
        <div className="flex flex-col gap-6">
            <header className="flex items-center gap-2">
                <ProfilePic bg={'bg-slate-900 text-white'} />
                <h2 className="font-bold text-slate-900 text-xl">{userData ? userData.name : 'Astromaniako'}</h2>
            </header>
            <section>
                <div className="bg-gray-200 p-4 rounded-xl">☆ Deixe suas ideias brilharem como estrelas ☆ </div>
            </section>
        </div>
    </ModalPostLayout>);
}

export default ModalPost;