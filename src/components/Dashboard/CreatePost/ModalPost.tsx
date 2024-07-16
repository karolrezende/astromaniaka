/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useData } from "@/providers/DataProvider";
import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";

import { CircleDot, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ModalEmoji from "./TypePost/ModalEmoji";
import { postRegisterType } from "@/types/post.types";
import ModalTypePost from "./TypePost/ModalTypePost";
import { createPost } from "@/services/post.services";
import { Type_post } from "@/utils/enums";
import Popup from "@/components/common/Popup/Popup";

const ModalPost = ({ handleModalPost }: { handleModalPost: () => void }) => {
  const { userData } = useData();

  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isOpenTypePost, setIsOpenTypePost] = useState(false);
  const [typePost, setTypePost] = useState("");
  const [postBody, setPostBody] = useState({ title: "", description: "" });
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível criar o post"
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPostBody((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOpenEmoji = (emoji?: { native: string }) => {
    setIsOpenEmoji(!isOpenEmoji);
    if (emoji) {
      setPostBody((prevState) => ({
        ...prevState,
        description: postBody.description + emoji.native,
      }));
    }
  };

  const handleOpenTypePost = (typePost?: string) => {
    setIsOpenTypePost(!isOpenTypePost);
    if (typePost) {
      setTypePost(typePost);
    }
  };

  const handleCreatePost = async () => {
    const data: postRegisterType = {
      userId: userData?.id!,
      post_type: typePost ? (typePost as Type_post) : undefined,
      title: postBody.title,
      description: postBody.description,
    };
    if (!data.description || !data.title) {
      setPopup(true);
      setPopupMessage(
        "Os campos de título e descrição precisam ser preenchidos!"
      );
      return;
    }

    try {
      const newPost = await createPost(data as postRegisterType);

      if (newPost) {
        console.log("entrou");
        setPopup(true);
        setPopupMessage("Post criado com sucesso!");
      }

      handleModalPost();
      console.log(newPost);
    } catch (error) {
      setPopup(true);
      console.error("Error creating post:", error);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleModalPost}>
      <div className="flex flex-col gap-3 md:w-[30rem]">
        <header className="flex items-center gap-2">
          <ProfilePic bg={"bg-slate-900 text-white"} name={userData?.name} />
          <h2 className="font-bold text-slate-900 text-xl ">
            {userData ? userData.name : "Astromaniako"}
          </h2>
        </header>
        <form className="flex flex-col gap-3">
          <div className="flex flex-col mt-2">
            <textarea
              className="rounded-xl h-8 flex items-center resize-none placeholder:text-md placeholder:font-medium outline-none font-bold text-lg"
              placeholder="Título"
              onChange={handleTitleChange}
            />
            <textarea
              ref={inputRef}
              value={postBody.description}
              onChange={handleDescriptionChange}
              className="rounded-xl resize-none placeholder:text-base outline-none"
              placeholder="Deixe suas ideias brilharem como estrelas ☆"
            ></textarea>
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
          <button
            className="bg-slate-800/90 text-white rounded-md py-2 active:bg-slate-900"
            onClick={(e) => {
              e.preventDefault();
              handleCreatePost();
            }}
          >
            Publicar
          </button>
        </form>
      </div>
      {isOpenEmoji && <ModalEmoji handleOpenEmoji={handleOpenEmoji} />}
      {isOpenTypePost && (
        <ModalTypePost
          handleOpenTypePost={handleOpenTypePost}
          typePost={typePost}
        />
      )}

      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalPost;
