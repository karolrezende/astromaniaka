import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useData } from "@/providers/DataProvider";
import { Image, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ModalEmoji from "./TypePost/ModalEmoji";
import TypePic from "./TypePost/TypePic";

const ModalPost = ({ handleModalPost }: { handleModalPost: () => void }) => {
  const { userData } = useData();

  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isOpenPic, setIsOpenPic] = useState(false)

  const [pic, setPic] = useState(false)

  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);


  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOpenImage = () => {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenEmoji = (emoji?: any) => {
    setIsOpenEmoji(!isOpenEmoji);
    if (emoji) {
      console.log(emoji);
      setText(text + emoji.native);
    }
  };

  const handleOpenPic = () => {
    setIsOpenPic(!isOpenPic);
  };

  return (
    <ModalPostLayout handleModalPost={handleModalPost}>
      <div className="flex flex-col gap-6 md:w-[30rem]">
        <header className="flex items-center gap-2">
          <ProfilePic bg={"bg-slate-900 text-white"} />
          <h2 className="font-bold text-slate-900 text-xl ">
            {userData ? userData.name : "Astromaniako"}
          </h2>
        </header>
        <section className="flex flex-col gap-3">
          <textarea
            ref={inputRef}
            value={text}
            onChange={handleTextChange}
            className="py-4 rounded-xl resize-none placeholder:text-base outline-none"
            placeholder="Deixe suas ideias brilharem como estrelas ☆"
          ></textarea>
          {
            isOpenPic && <TypePic handleOpenPic={handleOpenPic}/>
          }
          <div className="border p-1 flex justify-between gap-2 border-slate-900/60 rounded-lg items-center">
            <p className="px-1">Adicionar a publicação</p>

            <div className="flex gap-3">
              <div
                onClick={() => handleOpenImage()}
                title="Imagem"
                className="border border-slate-900/60 hover:border-slate-900/80 rounded-full p-1 text-slate-900/50 hover:text-slate-900/80  cursor-pointer"
              >
                <Image size={20} onClick={()=> handleOpenPic()}/>
              </div>
              <div
                onClick={() => handleOpenEmoji()}
                title="Emoji"
                className="border border-slate-900/60 hover:border-slate-900/80 rounded-full p-1 text-slate-900/50 hover:text-slate-900/80 cursor-pointer"
              >
                <Smile size={20} />
              </div>
            </div>
          </div>
          <button className="bg-slate-800/90 text-white rounded-md py-2 active:bg-slate-900">
            Publicar
          </button>
        </section>
      </div>
      {isOpenEmoji && <ModalEmoji handleOpenEmoji={handleOpenEmoji} />}
      
    </ModalPostLayout>
  );
};

export default ModalPost;
