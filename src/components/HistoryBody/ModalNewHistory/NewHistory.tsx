/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Button from "@/components/common/Button/Button";
import Popup from "@/components/common/Popup/Popup";
import ModalPostLayout from "@/layout/ModalPostLayout/ModalPostLayout";
import { useAuth } from "@/providers/AuthProvider";
import { useData } from "@/providers/DataProvider";
import { createHistory } from "@/services/history.services";
import { useRef, useState } from "react";

const ModalNewHistory = ({
  handleModalHistory,
}: {
  handleModalHistory: () => void;
}) => {
  const { userData } = useData();
  const { token } = useAuth();
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

  const handleCreateHistory = async () => {
    const data: any = {
      userId: userData?.id!,
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
      const newPost = await createHistory(token, data as any);

      if (newPost) {
        setPopup(true);
        setPopupMessage("Post criado com sucesso!");
      }

      setTimeout(() => {
        handleModalHistory();
      }, 2000);
    } catch (error) {
      setPopup(true);
      console.error("Error creating post:", error);
    }
  };

  return (
    <ModalPostLayout handleModalPost={handleModalHistory}>
      <div className="min-w-[50vw]">
        <h1 className="text-lg font-bold">Postar novo fato histórico?</h1>
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

          <Button onClick={handleCreateHistory}>Enviar</Button>
        </div>
      </div>
      {popup && <Popup message={popupMessage} setMessage={setPopupMessage} />}
    </ModalPostLayout>
  );
};

export default ModalNewHistory;
