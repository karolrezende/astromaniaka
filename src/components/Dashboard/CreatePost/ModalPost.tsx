import { useData } from "@/providers/DataProvider";
import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";

import { CircleDot, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ModalEmoji from "./TypePost/ModalEmoji";
import { FieldValues, useForm } from "react-hook-form";
import { postRegisterType } from "@/types/post.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { postRegisterSchema } from "@/schemas/post.schemas";
import ModalTypePost from "./TypePost/ModalTypePost";
import { createPost } from "@/services/post.services";

const ModalPost = ({ handleModalPost }: { handleModalPost: () => void }) => {
  const { userData } = useData();

  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isOpenTypePost, setIsOpenTypePost] = useState(false);
  const [text, setText] = useState("");
  const [typePost, setTypePost] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOpenEmoji = (emoji?: { native: string }) => {
    setIsOpenEmoji(!isOpenEmoji);
    if (emoji) {
      setText(text + emoji.native);
    }
  };

  const handleOpenTypePost = (typePost?: string) => {
    setIsOpenTypePost(!isOpenTypePost);
    if (typePost) {
      setTypePost(typePost);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postRegisterType>({
    resolver: zodResolver(postRegisterSchema),
  });

  const handleCreatePost = async (data: FieldValues) => {
    try {
      data.userId = userData?.id;
      data.post_type = typePost;
      console.log(data);
      const newPost = await createPost(data as postRegisterType);
      console.log(newPost);
      // Provide user feedback here if needed
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error and provide feedback to user
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleModalPost}>
      <div className="flex flex-col gap-3 md:w-[30rem]">
        <header className="flex items-center gap-2">
          <ProfilePic bg={"bg-slate-900 text-white"} />
          <h2 className="font-bold text-slate-900 text-xl ">
            {userData ? userData.name : "Astromaniako"}
          </h2>
        </header>
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col mt-2">
            <textarea
              className="rounded-xl h-8 flex items-center resize-none placeholder:text-md placeholder:font-medium outline-none font-bold text-lg"
              placeholder="Título"
              {...register("title")}
            />
            <span>{errors.title?.message || "\u00A0"}</span>

            <textarea
              {...register("description")}
              ref={inputRef}
              value={text}
              onChange={handleTextChange}
              className="rounded-xl resize-none placeholder:text-base outline-none"
              placeholder="Deixe suas ideias brilharem como estrelas ☆"
            ></textarea>
            <span>{errors.description?.message || "\u00A0"}</span>
          </div>

          <div className="border p-1 flex justify-between gap-2 border-slate-900/60 rounded-lg items-center">
            <p className="px-1">Adicionar a publicação</p>
            <div className="flex gap-3">
              <div
                onClick={() => handleOpenEmoji()}
                title="Emoji"
                className="border border-slate-900/60 hover:border-slate-900/80 rounded-full p-1 text-slate-900/50 hover:text-slate-900/80 cursor-pointer"
              >
                <Smile size={20} />
              </div>
              <div
                onClick={() => handleOpenTypePost()}
                title="Tipo de Post"
                className="border border-slate-900/60 hover:border-slate-900/80 rounded-full p-1 text-slate-900/50 hover:text-slate-900/80 cursor-pointer"
              >
                <CircleDot size={20} />
              </div>
            </div>
          </div>
          <button className="bg-slate-800/90 text-white rounded-md py-2 active:bg-slate-900">
            Publicar
          </button>
        </form>
      </div>
      {isOpenEmoji && <ModalEmoji handleOpenEmoji={handleOpenEmoji} />}
      {isOpenTypePost && (
        <ModalTypePost handleOpenTypePost={handleOpenTypePost} />
      )}
    </ModalPostLayout>
  );
};

export default ModalPost;
