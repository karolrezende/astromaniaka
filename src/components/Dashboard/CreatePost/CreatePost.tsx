import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import { useData } from "@/providers/DataProvider";
import { PenLine } from "lucide-react";
import { useState } from "react";
import ModalPost from "./ModalPost";

const CreatePost = () => {
  const { userData } = useData();
  const [isModal, setIsModal] = useState(false);

  const handleModalPost = () => {
    setIsModal(!isModal);
  };

  return (
    <section className="glass flex items-center gap-4 p-4">
      <ProfilePic name={userData?.name} />
      <button
        type="button"
        onClick={() => handleModalPost()}
        className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-3.5 text-left text-sm text-slate-400 transition hover:border-nebula-400/30 hover:bg-white/[0.06] hover:text-slate-200"
      >
        <span>
          Que supernovas estão explodindo em sua mente hoje,{" "}
          {userData ? userData.name.split(" ")[0] : "Astromaniako"}?
        </span>
        <PenLine
          size={18}
          className="hidden shrink-0 text-nebula-300 transition group-hover:text-stardust-400 md:block"
        />
      </button>

      {isModal && <ModalPost handleModalPost={handleModalPost} />}
    </section>
  );
};

export default CreatePost;
