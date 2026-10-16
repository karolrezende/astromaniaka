/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useData } from "@/providers/DataProvider";
import ProfilePic from "@/components/common/ProfilePic/ProfilePic";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";

import { Shapes, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import ModalEmoji from "./TypePost/ModalEmoji";
import { postRegisterType } from "@/types/post.types";
import ModalTypePost from "./TypePost/ModalTypePost";
import { createPost } from "@/services/post.services";
import { Type_post_enum } from "@/utils/enums";
import { getPostTypeMeta } from "@/utils/postTypes";
import Popup from "@/components/common/Popup/Popup";
import { useAuth } from "@/providers/AuthProvider";

const ModalPost = ({ handleModalPost }: { handleModalPost: () => void }) => {
  const { userData } = useData();
  const { token } = useAuth();

  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [isOpenTypePost, setIsOpenTypePost] = useState(false);
  const [typePost, setTypePost] = useState("");
  const [postBody, setPostBody] = useState({ title: "", description: "" });
  const [popup, setPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(
    "Não foi possível criar o post"
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleCreatePost = async (event: React.FormEvent) => {
    event.preventDefault();

    const data: postRegisterType = {
      userId: userData?.id!,
      post_type: typePost ? (typePost as Type_post_enum) : undefined,
      title: postBody.title,
      description: postBody.description,
    };

    try {
      if (!data.description || !data.title) {
        setPopup(true);
        setPopupMessage(
          "Os campos de título e descrição precisam ser preenchidos!"
        );
        return;
      }
      const newPost = await createPost(token, data as postRegisterType);

      if (newPost) {
        setPopup(true);
        setPopupMessage("Post enviado! Ele aparece no feed após aprovação.");
      }

      setTimeout(() => {
        handleModalPost();
      }, 2000);
    } catch (error) {
      setPopup(true);
      console.error("Error creating post:", error);
    }
  };

  const toolClass = (active: boolean) =>
    `icon-btn border ${
      active
        ? "border-nebula-400/50 bg-nebula-500/15 text-nebula-300"
        : "border-white/10"
    }`;

  return (
    <ModalPostLayout handleModalPost={handleModalPost}>
      <div className="flex flex-col gap-5">
        <header className="flex items-center gap-3 pr-8">
          <ProfilePic name={userData?.name} />
          <div>
            <h2 className="text-base font-semibold text-white">
              {userData ? userData.name : "Astromaniako"}
            </h2>
            <p className="text-xs text-slate-400">Nova publicação</p>
          </div>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleCreatePost}>
          <div className="flex flex-col gap-2">
            <input
              className="w-full bg-transparent font-display text-xl font-semibold text-white outline-none placeholder:text-slate-500"
              placeholder="Título"
              value={postBody.title}
              onChange={handleTitleChange}
            />
            <textarea
              ref={inputRef}
              value={postBody.description}
              onChange={handleDescriptionChange}
              rows={5}
              className="w-full resize-none bg-transparent text-sm leading-relaxed text-slate-200 outline-none placeholder:text-slate-500"
              placeholder="Deixe suas ideias brilharem como estrelas ☆"
            ></textarea>
          </div>

          <div className="surface flex items-center justify-between gap-2 px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Tipo:</span>
              <span className={`chip ${getPostTypeMeta(typePost).chip}`}>
                {getPostTypeMeta(typePost).label}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleOpenEmoji()}
                title="Emoji"
                className={toolClass(isOpenEmoji)}
              >
                <Smile size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleOpenTypePost()}
                title="Tipo de post"
                className={toolClass(isOpenTypePost)}
              >
                <Shapes size={18} />
              </button>
            </div>
          </div>
          {isOpenTypePost && (
            <ModalTypePost
              handleOpenTypePost={handleOpenTypePost}
              typePost={typePost}
            />
          )}
          <button className="btn-primary w-full" type="submit">
            Publicar
          </button>
        </form>
      </div>
      {isOpenEmoji && <ModalEmoji handleOpenEmoji={handleOpenEmoji} />}

      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalPost;
